import {Button, YStack} from "tamagui";
import supabase from "../lib/supabase";
import React from "react";
import Layout from "../components/Layout";

export default function Settings() {
    return (
        <Layout>
            <YStack justifyContent={"center"} flex={1}>
                <Button onPress={() => supabase.auth.signOut()}>Sign out</Button>
            </YStack>
        </Layout>
    );
}
