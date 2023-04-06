import MainButton from "../components/MainButton";
import {H1, YStack} from "tamagui";

export default function Home() {
    return (
        <YStack fullscreen={true} alignItems={"center"} justifyContent={"center"} space={3}>
            <H1>Payfren</H1>
            <MainButton/>
        </YStack>
    );
}
