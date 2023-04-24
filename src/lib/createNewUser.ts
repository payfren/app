import supabase from "./supabase";

export default async function createNewUser(phoneNumber: string, givenName : string, familyName: string): Promise<boolean> {
    const {data, error} = await supabase.auth.signInWithOtp(
        {
            phone: phoneNumber,
            options: {
                data: {
                    given_name: givenName,
                    family_name: familyName,
                }
            }
        })
    if (error) {
        console.log(error);
        return false;
    }
    return true;
}
