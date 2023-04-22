import {create} from "zustand";
import {defaultSignIn, ISignIn} from "../interfaces/SignIn";

interface SignInStore {
    signIn: ISignIn;
    setSignIn: (signIn: ISignIn) => void;
}

export const useSignInStore = create<SignInStore>((set) => ({
    signIn: defaultSignIn,
    setSignIn: (signIn) => set(() => ({signIn})),
}));
