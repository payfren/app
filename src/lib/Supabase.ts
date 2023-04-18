import {createClient} from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';
import * as SecureStore from "expo-secure-store";
import {SUPABASE_ANON_KEY, SUPABASE_URL} from "@env";

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        return SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        return SecureStore.deleteItemAsync(key);
    },
};

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    // Store sensitive data in secure storage
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export default supabase;
