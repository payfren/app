import {useRouter, useSegments} from 'expo-router';
import {createContext, useContext, useEffect, useState} from 'react';
import supabase from '../lib/supabase';
import NetInfo from '@react-native-community/netinfo';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

function useProtectedRoute(user, isLoading, isOffline) {
    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
        if (!isLoading) {
            if (isOffline) {
                router.replace('/network-error');
            } else {
                const inAuthGroup = segments[0] === '(auth)';
                const onNetworkError = segments[0] === 'network-error';
                if (!user && !inAuthGroup) {
                    router.replace('/');
                } else if (user && (inAuthGroup || onNetworkError)) {
                    router.replace('/home');
                }
            }
        }
    }, [user, segments, isLoading, isOffline, router]);
}


export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setOfflineStatus] = useState(false);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });

        return () => removeNetInfoSubscription();
    }, []);

    useProtectedRoute(user, isLoading, isOffline);

    useEffect(() => {
        const fetchSession = async () => {
            setIsLoading(true);
            supabase.auth.getSession()
                .then(({data: session}) => {
                    setUser(session?.session.user ?? null);
                })
                .catch((error) => {
                    console.error('Error fetching session:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        const subscribeToAuthChanges = async () => {
            supabase.auth.onAuthStateChange(async (event, session) => {
                setUser(session?.user ?? null);
            });
        };

        const initializeAuth = async () => {
            const [_, authListener] = await Promise.all([
                fetchSession(),
                subscribeToAuthChanges(),
            ]);
            return authListener;
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
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {!isLoading && props.children}
        </AuthContext.Provider>
    );
}
