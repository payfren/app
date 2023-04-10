import MainButton from "../components/MainButton";
import {H4, Image, Spacer, YStack} from "tamagui";
import {Appearance} from "react-native";
import getColorScheme = Appearance.getColorScheme;

export default function WelcomePage() {
    const lightLogo = require("../../assets/payfrenLogoTextDark.png");
    const darkLogo = require("../../assets/payfrenLogoTextLight.png");
    let logoPath = getColorScheme() === "dark" ? darkLogo : lightLogo;

    return (
        <YStack backgroundColor={"$background"} fullscreen={true} alignItems={"center"} justifyContent={"center"}>
            <Image source={logoPath} scale={0.3}/>
            <H4>A new home for your accounts</H4>
            <Spacer size={"$10"}/>
            <MainButton/>
        </YStack>
    );
}
