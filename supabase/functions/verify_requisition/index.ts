import {serve} from "https://deno.land/std@0.168.0/http/server.ts"
import {createClient, SupabaseClient} from "https://esm.sh/@supabase/supabase-js@2.21.0"

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
    const {data: user_data, error} = await supabase.auth.getUser();
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
    const userID = user_data.user.id;

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

    const tokenData = await tokenResponse.json();
    const authToken = tokenData['access'];

    const lastRequisition = await supabase.from('psd2_requisitions')
        .select('requisition_id')
        .eq('initiated_by', userID)
        .order('created_at', {ascending: false})
        .limit(1);

    if (lastRequisition.data?.length === 0) {
        return new Response(
            JSON.stringify({message: "No requisition found"}),
            {
                status: 200,
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
            }
        );
    }

    const requisitionId: string = (lastRequisition.data as Array<{ requisition_id: string }>)[0]['requisition_id'];
    const requisitionStatus = await fetch(`https://ob.nordigen.com/api/v2/requisitions/${requisitionId}/`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
        }
    });

    const requisitionStatusData = await requisitionStatus.json();
    const status = requisitionStatusData['status'];
    if (status !== 'LN') {
        // User did not complete the requisition, so we can delete the requisition
        // Delete requisition from database
        await supabase.from('psd2_requisitions')
            .delete()
            .eq('requisition_id', requisitionId);
        // Delete from Nordigen API
        await fetch(`https://ob.nordigen.com/api/v2/requisitions/${requisitionId}/`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
        });
    } else {
        await supabase.from('psd2_requisitions').update({status: 'LN'}).eq('requisition_id', requisitionId);
        const requisitionAccounts = requisitionStatusData['accounts'];
        // Add Nordigen account IDs to database
        for (const account of requisitionAccounts) {
            await supabase.from('bank_accounts')
                .insert([
                    {
                        owned_by: userID,
                        nordigen_account_id: account,
                    }
                ]);
        }
    }

    return new Response(
        JSON.stringify({message: "Requisition verified"}),
        {
            status: 200,
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

})
