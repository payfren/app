import supabase from "./supabase";

export default async function authenticateUser(phoneNumber: string): Promise<boolean> {
    const {error} = await supabase.auth.signInWithOtp(
        {
            phone: phoneNumber,
            options: {
                shouldCreateUser: false,
            }
        })
    if (error) {
        console.log(error);
        return false;
    }
    return true;
}
