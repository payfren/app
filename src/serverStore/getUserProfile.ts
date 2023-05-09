import supabase from "../lib/supabase";
import {useQuery} from "@tanstack/react-query";

const fetchUserProfile = async () => {
    const {data: userData, error: userError} = await supabase.auth.getUser();
    if (userError) {
        throw userError;
    }
    const userId = userData.user.id;
    const {data, error} = await supabase.from('profiles').select('*').eq('user_id', userId);
    if (error) {
        throw error;
    }
    if (data.length === 0) {
        // Retry the query after 1 second
        throw new Error('Profile not found');
    }
    return data[0];
}

export default function useUserProfile() {
    return useQuery({queryKey: ['userProfile'], queryFn: fetchUserProfile, networkMode: 'online', retry: 5, retryDelay: 1000});
}
