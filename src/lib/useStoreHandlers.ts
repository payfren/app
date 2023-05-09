import {useSignUpStore} from "../clientStore/SignUpStore";
import {useSignInStore} from "../clientStore/SignInStore";

// This is a custom hook that returns the correct store handlers based on the fromPage query param
export const useStoreHandlers = (fromPage) => {
    let getOTPCode, setOTPCode, getPhoneNumber;
    if (fromPage === 'signup') {
        getOTPCode = useSignUpStore(state => state.getOTPCode);
        setOTPCode = useSignUpStore(state => state.setOTPCode);
        getPhoneNumber = useSignUpStore(state => state.getPhoneNumber);
    } else {
        getOTPCode = useSignInStore(state => state.getOTPCode);
        setOTPCode = useSignInStore(state => state.setOTPCode);
        getPhoneNumber = useSignInStore(state => state.getPhoneNumber);
    }
    return {getOTPCode, setOTPCode, getPhoneNumber};
};
