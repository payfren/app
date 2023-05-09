import supabase from "./supabase";

export default async function verifyOTPCode(otpCode : string, phoneNumber: string): Promise<boolean> {
    const {error} = await supabase.auth.verifyOtp({phone: phoneNumber, token: otpCode, type: "sms"});
    if (error) {
        console.log(error);
        return false;
    }
    return true;
}
