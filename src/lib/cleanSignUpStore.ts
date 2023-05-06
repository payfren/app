import {useSignUpStore} from "../clientStore/SignUpStore";
export default function cleanSignUpStore() {
    const signUpStore = useSignUpStore.getState();
    signUpStore.setFamilyName(null);
    signUpStore.setGivenName(null);
    signUpStore.setOTPCode(null);
    signUpStore.setPhoneNumber('+40 ');
}
