import {TamaguiProvider} from "tamagui";
import {useFonts} from "expo-font";
import appConfig from "../tamagui.config";
import Home from "./pages/Home";

export default function App() {
    const [loaded] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <TamaguiProvider config={appConfig}>
            <Home/>
        </TamaguiProvider>
    );
}
