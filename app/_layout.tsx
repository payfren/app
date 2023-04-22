import {Slot} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import {Platform, useColorScheme} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import {TamaguiProvider} from "tamagui";
import {StatusBar} from "expo-status-bar";
import appConfig from "../tamagui.config";
import Splash from "../src/pages/Splash";

export default function Layout() {
    const [isReady, setReady] = useState(false);
    const colorScheme = useColorScheme();

    if (Platform.OS === "android") {
        useEffect(() => {
            NavigationBar.setBackgroundColorAsync(colorScheme === "dark" ? "#171717" : "#fcfcfc").then(
                () => {
                    NavigationBar.setButtonStyleAsync(colorScheme === "dark" ? "light" : "dark");
                }
            );
        }, [colorScheme]);
    }

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 1500);
    }, []);

    const [loaded] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    if (!loaded || !isReady) {
        return (
            <TamaguiProvider config={appConfig} defaultTheme={colorScheme}>
                <StatusBar translucent={true} style={"auto"}/>
                <Splash/>
            </TamaguiProvider>
        );
    }

    // Render the children routes now that all the assets are loaded.
    return (
        <TamaguiProvider config={appConfig} defaultTheme={colorScheme}>
            <StatusBar translucent={true} style={"auto"}/>
            <Slot/>
        </TamaguiProvider>
    );
}
