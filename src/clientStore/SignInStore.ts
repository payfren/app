import {create} from "zustand";
import {defaultSignIn, ISignInProfile} from "../interfaces/SignInProfile";

interface SignInStore {
    profile: ISignInProfile;
    setPhoneNumber: (phoneNumber: string) => void;
    setOTPCode: (otpCode: string) => void;
    getPhoneNumber: () => string;
    getOTPCode: () => string;
}

export const useSignInStore = create<SignInStore>((set, get) => ({
    profile: defaultSignIn,
    setPhoneNumber: (phoneNumber) => set((state) => ({profile: {...state.profile, phoneNumber}})),
    setOTPCode: (otpCode) => set((state) => ({profile: {...state.profile, otpCode}})),
    getPhoneNumber: () => {
        return get().profile.phoneNumber;
    },
    getOTPCode: () => {
        return get().profile.otpCode;
    },
}));
