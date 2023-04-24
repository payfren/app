import supabase from "./supabase";

export default async function validateOTPCode(otpCode : string, phoneNumber: string): Promise<boolean> {
    const {data, error} = await supabase.auth.verifyOtp({phone: phoneNumber, token: otpCode, type: "sms"});
    if (error) {
        console.log(error);
        return false;
    }
    return true;
}
