import MainButton from "../components/MainButton";
import {H5, Image, Spacer, XStack, YStack} from "tamagui";
import {Appearance} from "react-native";
import SecondaryButton from "../components/SecondaryButton";
import getColorScheme = Appearance.getColorScheme;

export default function WelcomePage() {
    const lightLogo = require("../../assets/payfrenLogoTextDark.png");
    const darkLogo = require("../../assets/payfrenLogoTextLight.png");
    const illustrationWelcome = require("../../assets/transactionApproved.png")
    let logoPath = getColorScheme() === "dark" ? darkLogo : lightLogo;

    return (
        <YStack backgroundColor={"$background"} fullscreen={true} alignItems={"center"} justifyContent={"center"}>
            <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                <XStack>
                    <Spacer size={"$5"}/>
                    <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                        <Image source={logoPath} height={60} resizeMode={"contain"}/>
                        <Spacer size={"$4"}/>
                        <H5 textAlign={"center"} fontFamily={"Inter"}>Plătește si primește bani mai ușor direct în
                            contul tău</H5>
                        <Spacer size={"$10"}/>
                        <Image maxHeight={300} maxWidth={300} source={illustrationWelcome} resizeMode={"contain"}/>
                    </YStack>
                    <Spacer size={"$5"}/>
                </XStack>
            </YStack>
            <XStack>
                <Spacer size={"$5"}/>
                <MainButton text={"Creează un cont"} flexSize={0.5}/>
                <Spacer size={"$3"}/>
                <SecondaryButton text={"Autentifică-te"} flexSize={0.5}/>
                <Spacer size={"$5"}/>
            </XStack>
            <Spacer size={"$5"}/>
        </YStack>
    );
}
