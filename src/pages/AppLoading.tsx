import {Spinner, YStack} from "tamagui";
import Layout from "../components/Layout";

export default function AppLoading() {
    return (
        <Layout>
            <YStack justifyContent={"center"} alignContent={"center"} flex={1}>
                <Spinner size={"large"} color={"$orange10"}/>
            </YStack>
        </Layout>
    );
}
