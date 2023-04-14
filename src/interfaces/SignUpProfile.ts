export interface ISignUpProfile {
    phoneNum?: string;
    givenName?: string;
    familyName?: string;
}

export const defaultProfile: ISignUpProfile = {
    phoneNum: '+40 ',
    givenName: '',
    familyName: '',
}
