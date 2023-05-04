import {useRouter, useSegments} from 'expo-router';
import {createContext, useContext, useEffect, useState} from 'react';
import supabase from '../lib/supabase';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

function useProtectedRoute(user, isLoading) {
    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
        if (!isLoading) {
            const inAuthGroup = segments[0] === '(auth)';
            if (!user && !inAuthGroup) {
                router.replace('/');
            } else if (user && inAuthGroup) {
                router.replace('/home');
            }
        }
    }, [user, segments, isLoading]);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useProtectedRoute(user, isLoading);

    useEffect(() => {
        const fetchSession = async () => {
            setIsLoading(true);
            supabase.auth.getUser()
                .then(({data: session}) => {
                    setUser(session?.user ?? null);
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
