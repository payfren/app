import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
    const secretId = Deno.env.get("NORDIGEN_SECRET_ID");
    const secretKey = Deno.env.get("NORDIGEN_SECRET_KEY");

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

    const response = await fetch("https://ob.nordigen.com/api/v2/institutions/?country=ro", {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": 'Bearer ' + authToken,
        },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    });
});
