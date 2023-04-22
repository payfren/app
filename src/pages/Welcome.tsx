import MainButton from "../components/MainButton";
import {H5, Image, Spacer, XStack, YStack} from "tamagui";
import {useColorScheme} from "react-native";
import SecondaryButton from "../components/SecondaryButton";
import Layout from "../components/Layout";
import {useMemo} from "react";
import {Link} from "expo-router";

export default function Welcome() {
    const darkLogo = require("../../assets/payfrenLogoTextDark.png");
    const lightLogo = require("../../assets/payfrenLogoTextLight.png");
    const illustrationWelcome = require("../../assets/welcomeImage.png")
    const colorScheme = useColorScheme();
    const logoPath = useMemo(() => {
        return colorScheme === "dark" ? lightLogo : darkLogo;
    }, [colorScheme]);

    return (
        <Layout>
            <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                <Spacer size={"$5"}/>
                <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                    <YStack alignItems={"center"} justifyContent={"center"}>
                        <Image source={logoPath} height={55} resizeMode={"contain"}/>
                        <Spacer size={"$2"}/>
                        <H5 textAlign={"center"} fontFamily={"Inter"}>Plătește si primește bani mai ușor direct în
                            contul tău</H5>
                    </YStack>
                    <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                        <Image style={{height: "60%"}} source={illustrationWelcome}
                               resizeMode={"contain"}/>
                    </YStack>
                </YStack>
                <XStack>
                    <Link href={"/signup"} asChild>
                        <MainButton text={"Creează un cont"} flexSize={0.5}/>
                    </Link>
                    <Spacer size={"$3"}/>
                    <Link href={"/login"} asChild>
                        <SecondaryButton text={"Autentifică-te"} flexSize={0.5}/>
                    </Link>
                </XStack>
            </YStack>
        </Layout>
    );
}
