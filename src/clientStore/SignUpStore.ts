import {create} from 'zustand';
import {defaultSignUp, ISignUpProfile} from '../interfaces/SignUpProfile';

interface SignUpStore {
    profile: ISignUpProfile;
    setPhoneNumber: (phoneNumber: string) => void;
    setOTPCode: (otpCode: string) => void;
    setGivenName: (givenName: string) => void;
    setFamilyName: (familyName: string) => void;
    getPhoneNumber: () => string;
    getOTPCode: () => string;
    getGivenName: () => string;
    getFamilyName: () => string;
}

export const useSignUpStore = create<SignUpStore>((set, get) => ({
    profile: defaultSignUp,
    setPhoneNumber: (phoneNumber) => set((state) => ({profile: {...state.profile, phoneNumber}})),
    setOTPCode: (otpCode) => set((state) => ({profile: {...state.profile, otpCode}})),
    setGivenName: (givenName) => set((state) => ({profile: {...state.profile, givenName}})),
    setFamilyName: (familyName) => set((state) => ({profile: {...state.profile, familyName}})),
    getPhoneNumber: () => {
        return get().profile.phoneNumber;
    },
    getOTPCode: () => {
        return get().profile.otpCode;
    },
    getGivenName: () => {
        return get().profile.givenName;
    },
    getFamilyName: () => {
        return get().profile.familyName;
    }
}));
