import {Spinner, YStack} from "tamagui";
import Layout from "../components/Layout";
import React from "react";

export default function AppLoading() {
    return (
        <Layout>
            <YStack justifyContent={'center'} alignContent={"center"} flex={1}>
                <Spinner color={"$color"}/>
            </YStack>
        </Layout>
    );
}
