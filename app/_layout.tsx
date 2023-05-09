import {Slot, SplashScreen} from "expo-router";
import {useFonts} from "expo-font";
import {Fragment, useEffect, useState} from "react";
import {Platform, useColorScheme} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import {TamaguiProvider} from "tamagui";
import {StatusBar} from "expo-status-bar";
import appConfig from "../tamagui.config";
import {AuthProvider} from "../src/context/AuthProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastProvider} from "@tamagui/toast";

const queryClient = new QueryClient();
export default function Layout() {
    const [isReady, setReady] = useState(false);
    const colorScheme = useColorScheme();

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
            <TamaguiProvider config={appConfig} defaultTheme={colorScheme}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <ToastProvider>
                            <StatusBar translucent={true} style={"auto"}/>
                            <Slot/>
                        </ToastProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </TamaguiProvider>
        </Fragment>
    );
}
