import {useRouter, useSegments} from 'expo-router';
import {createContext, useEffect, useState} from 'react';
import supabase from '../lib/supabase';
import NetInfo from '@react-native-community/netinfo';

const AuthContext = createContext(null);

function useProtectedRoute(user, isOffline) {
    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
        if (isOffline) {
            router.replace('/network-error');
        } else {
            const inAuthGroup = segments[0] === '(auth)';
            const onNetworkError = segments[0] === 'network-error';
            if (user && (inAuthGroup || onNetworkError)) {
                router.replace('/home');
            } else if (!user && !inAuthGroup) {
                router.replace('/');
            }
        }
    }, [segments, router, user, isOffline]);
}

function useNetworkStatus() {
    const [isOffline, setOfflineStatus] = useState(false);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });

        return () => {
            removeNetInfoSubscription();
        };
    }, []);

    return isOffline;
}

function useAuthLogic(isOffline) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscribeToAuthChanges = () => {
            // TODO: Handle the case when there is a valid session but the user has been deleted from the database
            supabase.auth.onAuthStateChange(async (event, session) => {
                setUser(session?.user);
            });
        };

        const initializeAuth = async () => {
            return subscribeToAuthChanges();
        };

        let authListener;
        initializeAuth()
            .then((listener) => {
                authListener = listener;
            })
            .catch((error) => {
                console.error('Error initializing authentication:', error);
            });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [isOffline]);

    return {user};
}

export function AuthProvider(props) {
    const isOffline = useNetworkStatus();
    const {user} = useAuthLogic(isOffline);
    useProtectedRoute(user, isOffline);

    return (
        <AuthContext.Provider value={{user}}>
            {props.children}
        </AuthContext.Provider>
    );
}
