import {Image} from "tamagui";
import {useColorScheme} from "react-native";
import {useMemo} from "react";

const logoPaths = {
    light: require("../../assets/logoLight.png"),
    dark: require("../../assets/logoDark.png"),
};

export default function Logo() {
    const colorScheme = useColorScheme();
    const logoPath = useMemo(
        () => (colorScheme === "dark" ? logoPaths.light : logoPaths.dark),
        [colorScheme]
    );

    return (
        <Image
            source={logoPath}
            maxHeight={60}
            maxWidth={60}
            resizeMode={"contain"}
        />
    );
}
