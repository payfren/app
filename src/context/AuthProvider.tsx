import {useRouter, useSegments} from "expo-router";
import {createContext, useContext, useEffect, useState} from "react";
import supabase from "../lib/supabase";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

function useProtectedRoute(user) {
    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";
        if (!user && !inAuthGroup) {
            router.replace("/");
        } else if (user && inAuthGroup) {
            router.replace("/home");
        }
    }, [user, segments]);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    useProtectedRoute(user);

    useEffect(() => {
        const fetchSession = async () => {
            supabase.auth.getSession()
                .then(({data: session}) => {
                    setUser(session?.session?.user ?? null);
                })
                .catch((error) => {
                    console.error('Error fetching session:', error);
                });
        };

        const subscribeToAuthChanges = async () => {
            supabase.auth.onAuthStateChange(async (event, session) => {
                setUser(session?.user ?? null);
            })
        };


        const initializeAuth = async () => {
            const [_, authListener] = await Promise.all([fetchSession(), subscribeToAuthChanges()]);
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
            {props.children}
        </AuthContext.Provider>
    );
}
