import {useSignInStore} from "../clientStore/SignInStore";
export default function cleanLoginStore() {
    const signInStore = useSignInStore.getState();
    signInStore.setOTPCode(null);
    signInStore.setPhoneNumber('+40 ');
}
