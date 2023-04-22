export interface ISignIn {
    phoneNum?: string;
    otpCode?: string;
}

export const defaultSignIn: ISignIn = {
    phoneNum: '+40 ',
    otpCode: '',
}
