import {serve} from "https://deno.land/std@0.168.0/http/server.ts"
import {createClient, SupabaseClient} from "https://esm.sh/@supabase/supabase-js@2.21.0"

interface Account {
    owned_by: string;
    nordigen_account_id: string;
    iban: string;
    currency: string;
    balance: string;
    bank_name: string;
    bank_id: string;
    bank_logo: string;
}

serve(async (req) => {
    const secretId = Deno.env.get("NORDIGEN_SECRET_ID");
    const secretKey = Deno.env.get("NORDIGEN_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Get the user from the authorization header that is a JWT token
    const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
        global:
            {
                headers: {
                    Authorization: req.headers.get("Authorization")!,
                }
            }
    });
    // Decode the JWT token to get the user data
    const {data, error} = await supabase.auth.getUser();
    if (error) {
        return new Response(
            JSON.stringify({error: "Invalid request: JWT missing or could not be decoded"}),
            {
                status: 400,
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
            }
        );
    }
    const userId = data!.user.id;
    // Get the accounts from the request body
    let accounts: string[] = [];
    try {
        const json = await req.json();
        accounts = json.accounts;
    } catch (_) {
        return new Response(
            JSON.stringify({error: "Invalid request: no accounts were provided"}),
            {
                status: 400,
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
            }
        );
    }

    const tokenResponse = await fetch("https://ob.nordigen.com/api/v2/token/new/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            "secret_id": secretId,
            "secret_key": secretKey,
        }),
    });

    // Get the authorization token that allows us to create a requisition
    const tokenData = await tokenResponse.json();
    const authToken: string = tokenData['access'];

    for (const accountId of accounts) {
        let accountAlreadyInitialized = false;
        const account: Account = {
            owned_by: userId,
            nordigen_account_id: accountId,
            iban: "",
            currency: "",
            balance: "",
            bank_name: "",
            bank_id: "",
            bank_logo: "",
        }
        const {data: accountStatusResponse} = await supabase.from('bank_accounts').select('bank_id').eq('nordigen_account_id', accountId);
        const accountStatus = accountStatusResponse![0];
        // If institution_id is not null, it means that the account data is already in the database
        if (accountStatus.bank_id !== null) {
            accountAlreadyInitialized = true;
        }

        // Get the account balance
        const balanceResponse = await fetch(`https://ob.nordigen.com/api/v2/accounts/${accountId}/balances/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
        });
        const balanceData = await balanceResponse.json();
        account.balance = balanceData['balances'][0]['balanceAmount']['amount'];
        account.currency = balanceData['balances'][0]['balanceAmount']['currency'];

        if (accountAlreadyInitialized)
        {
            console.log(`Updating data for account ${accountId}`);
            const {error} = await supabase.from('bank_accounts').upsert({
                owned_by: account.owned_by,
                nordigen_account_id: account.nordigen_account_id,
                balance: account.balance,
                currency: account.currency,
            }, {onConflict: 'nordigen_account_id'});
            if (error) {
                return new Response(
                    JSON.stringify({
                        error: "Error while updating the accounts data",
                        message: error.message,
                    }),
                    {
                        status: 500,
                        headers: {
                            "content-type": "application/json; charset=UTF-8",
                        },
                    }
                );
            }
            continue;
        }
        // Get the account IBAN and bank ID
        const accountResponse = await fetch(`https://ob.nordigen.com/api/v2/accounts/${accountId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
        });
        const accountData = await accountResponse.json();
        account.iban = accountData['iban'];
        // Format the IBAN to be more readable, simply adding a space every 4 characters
        account.iban = account.iban.replace(/(.{4})/g, '$1 ').trim();
        account.bank_id = accountData['institution_id'];
        // PayPal does not have an IBAN
        if (account.bank_id === "PAYPAL_PPLXLULL")
            account.iban = 'Contul meu PayPal';

        // Get the account bank name and logo
        const bankDataResponse = await fetch(`https://ob.nordigen.com/api/v2/institutions/${account.bank_id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
        });
        const bankData = await bankDataResponse.json();
        account.bank_name = bankData['name'];
        account.bank_logo = bankData['logo'];

        console.log(account);
        const {error} = await supabase.from('bank_accounts').upsert([account], {onConflict: 'nordigen_account_id'});
        if (error) {
            return new Response(
                JSON.stringify({
                    error: "Error while updating the accounts data",
                    message: error.message,
                }),
                {
                    status: 500,
                    headers: {
                        "content-type": "application/json; charset=UTF-8",
                    },
                }
            );
        }
    }

    return new Response(
        JSON.stringify({message: "Accounts data updated"}),
        {
            status: 200,
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });
});
