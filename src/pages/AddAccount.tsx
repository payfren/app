import Layout from "../components/Layout";
import {H2, YStack} from "tamagui";

export default function AddAccount() {
    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <H2>Adaugă cont</H2>
            </YStack>
        </Layout>
    );
}
