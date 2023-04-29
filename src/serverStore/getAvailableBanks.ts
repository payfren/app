import {useQuery} from "@tanstack/react-query";
import supabase from "../lib/supabase.ts";

const fetchAvailableBanks = async () => {
    const {data, error} = await supabase.functions.invoke('available_banks');
    if (error) {
        throw error;
    }
    return data;
};

export default function useAvailableBanks() {
    return useQuery({queryKey: ['availableBanks'], queryFn: fetchAvailableBanks});
};

