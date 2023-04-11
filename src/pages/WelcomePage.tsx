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
            <XStack flex={1} alignItems={"center"} justifyContent={"center"}>
                <Spacer size={"$5"}/>
                <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                    <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                        <Spacer size={"$13"}/>
                        <YStack alignItems={"center"} justifyContent={"center"}>
                            <Image source={logoPath} height={60} resizeMode={"contain"}/>
                            <Spacer size={"$4"}/>
                            <H5 textAlign={"center"} fontFamily={"Inter"}>Plătește si primește bani mai ușor direct în
                                contul tău</H5>
                        </YStack>
                        <YStack alignItems={"center"} justifyContent={"center"} flex={1}>
                            <Image maxHeight={350} maxWidth={350} source={illustrationWelcome}
                                   resizeMode={"contain"}/>
                        </YStack>
                    </YStack>
                    <XStack>
                        <MainButton text={"Creează un cont"} flexSize={0.5}/>
                        <Spacer size={"$3"}/>
                        <SecondaryButton text={"Autentifică-te"} flexSize={0.5}/>
                    </XStack>
                    <Spacer size={"$5"}/>
                </YStack>
                <Spacer size={"$5"}/>
            </XStack>
        </YStack>
    );
}
