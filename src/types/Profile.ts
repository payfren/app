export interface Profile {
    phoneNum?: string;
    givenName?: string;
    familyName?: string;
    username?: string;
}

export const defaultProfile: Profile = {
    phoneNum: '+40 ',
    givenName: '',
    familyName: '',
    username: '',
}
