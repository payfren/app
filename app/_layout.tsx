import {Slot, SplashScreen, usePathname} from "expo-router";
import {useFonts} from "expo-font";
import {Fragment, useEffect, useState} from "react";
import {Platform, useColorScheme} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import {TamaguiProvider} from "tamagui";
import {StatusBar} from "expo-status-bar";
import appConfig from "../tamagui.config";
import {AuthProvider} from "../src/context/AuthProvider";

export default function Layout() {
    const [isReady, setReady] = useState(false);
    const colorScheme = useColorScheme();
    const currentPath = usePathname();

    useEffect(() => {
        console.log("Current route:", currentPath);
    }, [currentPath]);


    useEffect(() => {
        if (Platform.OS === "android") {
            NavigationBar.setBackgroundColorAsync(
                colorScheme === "dark" ? "#171717" : "#fcfcfc"
            ).then(() => {
                NavigationBar.setButtonStyleAsync(
                    colorScheme === "dark" ? "light" : "dark"
                );
            });
        }
    }, [colorScheme]);

    const [loaded] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    useEffect(() => {
        if (loaded) {
            setTimeout(() => {
                setReady(true);
            }, 1500);
        }
    }, [loaded]);

    // Weird bug that fonts are not loaded on first render if (!loaded || !isReady || <SplashScreen />), use ternary operator instead
    return !loaded ? (
        <SplashScreen/>
    ) : (
        <Fragment>
            {!isReady && <SplashScreen/>}
            <AuthProvider>
                <TamaguiProvider config={appConfig} defaultTheme={colorScheme}>
                    <StatusBar translucent={true} style={"auto"}/>
                    <Slot/>
                </TamaguiProvider>
            </AuthProvider>
        </Fragment>
    );
}
