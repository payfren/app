import supabase from "./supabase";
import {useSignUpStore} from "../clientStore/SignUpStore";

export default async function createUserProfile(): Promise<boolean> {
    const {data, error} = await supabase.auth.getUser();
    if (error) {
        console.log(error);
        return false;
    }
    const userId = data.user.id;
    const phoneNumber = useSignUpStore.getState().getPhoneNumber();
    const givenName = useSignUpStore.getState().getGivenName();
    const familyName = useSignUpStore.getState().getFamilyName();
    const {error: profileError} = await supabase.from('profiles')
        .insert([{
            user_id: userId,
            phone_number: phoneNumber,
            given_name: givenName,
            family_name: familyName
        }]);
    if (profileError) {
        console.log(profileError);
        return false;
    }
    return true;
}
