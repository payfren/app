import {TamaguiProvider} from "tamagui";
import {useFonts} from "expo-font";
import appConfig from "../tamagui.config";
import Home from "./pages/Home";
import {Appearance} from "react-native";
import {useEffect, useState} from "react";

export default function App() {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setColorScheme(colorScheme);
        });

        return () => subscription.remove();
    }, []);

    const [loaded] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <TamaguiProvider config={appConfig} defaultTheme={colorScheme}>
            <Home/>
        </TamaguiProvider>
    );
}
