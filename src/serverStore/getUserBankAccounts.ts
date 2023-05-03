import {useQuery} from '@tanstack/react-query';
import supabase from '../lib/supabase';

const fetchUserBankAccounts = async () => {
    const {data, error : accountsError} = await supabase
        .from('bank_accounts')
        .select('nordigen_account_id')
    if (accountsError) {
        throw new Error(accountsError.message);
    }
    console.log(data)
    const {error: refreshError} = await supabase.functions.invoke('get_accounts_data', {
        body :
            {
                accounts: data.map((bankAccount: any) => bankAccount.nordigen_account_id)
            }
    })
    if (refreshError) {
        throw new Error(refreshError.message);
    }

    const {data: bankAccounts, error} = await supabase
        .from('bank_accounts')
        .select('*')
        .order('created_at', {ascending: false})
    if (error) {
        throw new Error(error.message);
    }
    return bankAccounts;
};

export default function getUserBankAccounts(refreshKey: number) {
    return useQuery({queryKey: ['bankAccounts', refreshKey], queryFn: fetchUserBankAccounts, refetchOnMount: true, refetchInterval: 10000});
}
