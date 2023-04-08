import MainButton from "../components/MainButton";
import {H1, H4, Spacer, YStack} from "tamagui";

export default function Home() {
    return (
        <YStack backgroundColor={"$background"} fullscreen={true} alignItems={"center"} justifyContent={"center"}>
            <H1>Payfren</H1>
            <H4>Prima oară? Hai să te conectăm!</H4>
            <Spacer size={"$10"}/>
            <MainButton/>
        </YStack>
    );
}
