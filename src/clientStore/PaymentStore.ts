import {defaultPayment, IPayment} from "../interfaces/Payment";
import {create} from "zustand";

interface PaymentStore {
    payment: IPayment;
    setPayeeId: (payeeId: string) => void;
    setPayeePhoneNumber: (payeePhoneNumber: string) => void;
    setAmount: (amount: number) => void;
    getPayeeId: () => string;
    getPayeePhoneNumber: () => string;
    getAmount: () => string | number;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
    payment: defaultPayment,
    setPayeeId: (payeeId) => set((state) => ({payment: {...state.payment, payee_id: payeeId}})),
    setPayeePhoneNumber: (payeePhoneNumber) => set((state) => ({payment: {...state.payment, payee_phone_number: payeePhoneNumber}})),
    setAmount: (amount) => set((state) => ({payment: {...state.payment, amount}})),
    getPayeeId: () => {
        return get().payment.payee_id;
    },
    getPayeePhoneNumber: () => {
        return get().payment.payee_phone_number;
    },
    getAmount: () => {
        return get().payment.amount;
    }
}));
