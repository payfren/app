import {useColorScheme} from "react-native";
import {useMemo} from "react";
import {Image, YStack} from "tamagui";
import Layout from "../components/Layout";

export default function Splash() {
    const darkLogo = require("../../assets/logoDark.png");
    const lightLogo = require("../../assets/logoLight.png");
    const colorScheme = useColorScheme();
    const logoPath = useMemo(() => {
        return colorScheme === "dark" ? lightLogo : darkLogo;
    }, [colorScheme]);

    return (
        <Layout>
            <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                <Image source={logoPath} height={60} resizeMode={"contain"}/>
            </YStack>
        </Layout>
    );
}
