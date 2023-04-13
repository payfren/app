import {create} from 'zustand';
import {Profile, defaultProfile} from '../types/Profile';

interface ProfileStore {
    profile: Profile;
    setProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
    profile: defaultProfile,
    setProfile: (profile) => set(() => ({profile})),
}));
