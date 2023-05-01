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

    // Get the Institution ID from the request body
    let institution_id: string;
    try {
        const json = await req.json();
        institution_id = json.institution_id;
    } catch (_) {
        return new Response(
            JSON.stringify({error: "Invalid request: institution_id is missing"}),
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

    // Create a requisition
    const response = await fetch("https://ob.nordigen.com/api/v2/requisitions/", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + authToken,
        },
        body: JSON.stringify({
            "redirect": "payfren://home?finished_consent_flow=true",
            "institution_id": institution_id,
            "user_language": "RO",
            "reference": user_data.user.id,
        }),
    });

    const data = await response.json();
    const requisitionId: string = data['id'];
    const userReference: string = data['reference'];

    // Save the requisition id in the database
    await supabase.from('psd2_requisitions').insert([
        {
            requisition_id: requisitionId,
            initiated_by: userReference,
        }
    ]);

    // Return all the data to the client
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json; charset=UTF-8",
        }
    });
})
