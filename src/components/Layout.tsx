import {Spacer, XStack, YStack} from "tamagui";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function Layout({children}) {
    const insets = useSafeAreaInsets();

    return (
        <YStack backgroundColor={"$background"} fullscreen={true} justifyContent={"center"} alignItems={"center"}
                paddingTop={insets.top}>
            <XStack justifyContent={"center"} flex={1}>
                <Spacer size={"$5"}/>
                {children}
                <Spacer size={"$5"}/>
            </XStack>
            <Spacer size={"$5"}/>
        </YStack>
    );
}
