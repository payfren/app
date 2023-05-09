export interface ISignUpProfile {
    phoneNumber?: string;
    givenName?: string;
    familyName?: string;
    otpCode?: string;
}

export const defaultSignUp: ISignUpProfile = {
    phoneNumber: '+40 ',
    givenName: null,
    familyName: null,
    otpCode: null,
}
