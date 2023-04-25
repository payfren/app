import React, {useEffect, useState} from 'react';
import {Button, Paragraph, Spacer, YStack} from 'tamagui';
import Layout from '../../src/components/Layout';
import supabase from '../lib/supabase';

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await supabase.auth.getSession();
            setUser(currentUser.data.session.user);
        };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <Layout>
                <YStack justifyContent={'flex-start'} flex={1}>
                    <Paragraph>Loading...</Paragraph>
                </YStack>
            </Layout>
        );
    }

    return (
        <Layout>
            <YStack justifyContent={"center"} alignContent={"center"} flex={1}>
                <Paragraph
                    textAlign={"center"}>Welcome, {user.user_metadata.given_name} {user.user_metadata.family_name}</Paragraph>
                <Paragraph textAlign={"center"}>You are logged in as {user.phone}</Paragraph>
                <Spacer/>
                <Button onPress={() => supabase.auth.signOut()}>Sign out</Button>
            </YStack>
        </Layout>
    );
}
