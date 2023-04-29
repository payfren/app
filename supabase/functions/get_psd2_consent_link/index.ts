import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

console.log("Hello from Functions!")

serve(async (req) => {
  const secretId = Deno.env.get("NORDIGEN_SECRET_ID");
  const secretKey = Deno.env.get("NORDIGEN_SECRET_KEY");
  let institution_id;

  try {
    const json = await req.json();
    institution_id = json.institution_id;
  } catch (_) {
    return new Response(
        JSON.stringify({ error: "Invalid request" }),
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

  const tokenData = await tokenResponse.json();
  const authToken = tokenData['access'];

  const response = await fetch("https://ob.nordigen.com/api/v2/requisitions/", {
    method: "POST",
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authToken,
    },
    body: JSON.stringify({
      "redirect": "payfren://home",
      "institution_id": institution_id,
      "user_language": "RO",
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: {
        "content-type": "application/json; charset=UTF-8",
    }
  });
})
