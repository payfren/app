export interface ISignInProfile {
    phoneNumber?: string;
    otpCode?: string;
}

export const defaultSignIn: ISignInProfile = {
    phoneNumber: '+40 ',
    otpCode: '',
}
