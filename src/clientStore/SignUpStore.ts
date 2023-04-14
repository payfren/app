import {create} from 'zustand';
import {ISignUpProfile, defaultProfile} from '../interfaces/SignUpProfile';

interface SignUpStore {
    profile: ISignUpProfile;
    setProfile: (profile: ISignUpProfile) => void;
}

export const useSignUpStore = create<SignUpStore>((set) => ({
    profile: defaultProfile,
    setProfile: (profile) => set(() => ({profile})),
}));