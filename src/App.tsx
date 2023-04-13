import {TamaguiProvider} from "tamagui";
import {useFonts} from "expo-font";
import appConfig from "../tamagui.config";
import {Appearance, Platform} from "react-native";
import {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import SignUpPage from "./pages/SignUp";

export default function App() {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({colorScheme}) => {
            setColorScheme(colorScheme);
        });

        return () => subscription.remove();
    }, []);

    if (Platform.OS === "android") {
        useEffect(() => {
            NavigationBar.setBackgroundColorAsync(colorScheme === "dark" ? "#000000" : "#ffffff").then(
                () => {
                    NavigationBar.setButtonStyleAsync(colorScheme === "dark" ? "light" : "dark").then(
                        () => {
                            console.log("NavigationBar color scheme changed");
                        }
                    );
                }
            );
        }, [colorScheme]);
    }

    const [loaded] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <TamaguiProvider config={appConfig} defaultTheme={colorScheme}>
                <StatusBar translucent={true} style={colorScheme === "dark" ? "light" : "dark"}/>
                <SignUpPage/>
            </TamaguiProvider>
        </SafeAreaProvider>
    );
}
