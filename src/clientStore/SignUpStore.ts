import {create} from 'zustand';
import {defaultSignUp, ISignUpProfile} from '../interfaces/SignUpProfile';

interface SignUpStore {
    profile: ISignUpProfile;
    setPhoneNumber: (phoneNumber: string) => void;
    setOTPCode: (otpCode: string) => void;
    getPhoneNumber: () => string;
    getOTPCode: () => string;
}

export const useSignUpStore = create<SignUpStore>((set, get) => ({
    profile: defaultSignUp,
    setPhoneNumber: (phoneNumber) => set((state) => ({profile: {...state.profile, phoneNumber}})),
    setOTPCode: (otpCode) => set((state) => ({profile: {...state.profile, otpCode}})),
    getPhoneNumber: () => {
        return get().profile.phoneNumber;
    },
    getOTPCode: () => {
        return get().profile.otpCode;
    },
}));
