import {H3, Paragraph, XStack, YStack} from "tamagui";
import Layout from "../components/Layout";
import Logo from "../components/Logo";

export default function NetworkError() {
    return (
        <Layout>
            <YStack flex={1} justifyContent={'center'} alignItems={'center'}>
                <XStack>
                    <Logo/>
                </XStack>
                <H3>Eroare de conexiune</H3>
                <Paragraph textAlign={'center'}>
                    Asigură-te că ai o conexiune la internet și încearcă din nou.
                </Paragraph>
            </YStack>
        </Layout>
    );
}
