export interface IPayment {
    payee_id: string;
    payee_phone_number: string;
    amount: number;
}

export const defaultPayment: IPayment = {
    payee_id: '',
    payee_phone_number: '+40 ',
    amount: 0.00,
}
