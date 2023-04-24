import Layout from "../components/Layout";
import {Form, FormTrigger, H2, Image, Paragraph, Spacer, YStack} from "tamagui";
import {useColorScheme} from "react-native";
import MainButton from "../components/MainButton";
import {useCallback, useMemo} from "react";
import OTPInput from "../components/OTPInput";
import {useStoreHandlers} from "../lib/useStoreHandlers";
import {useSearchParams, useFocusEffect} from "expo-router";

export default function VerifyOTP() {
    const lightLogo = require("../../assets/logoLight.png");
    const darkLogo = require("../../assets/logoDark.png");
    const colorScheme = useColorScheme();
    const logoPath = useMemo(() => {
        return colorScheme === "dark" ? lightLogo : darkLogo;
    }, [colorScheme]);

    const {from} = useSearchParams();
    const {setOTPCode, getOTPCode} = useStoreHandlers(from);

    const handleOTPSubmit = () => {
        console.log("OTP Code: ", getOTPCode());
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                // Clear OTP code on unmount
                setOTPCode(null);
            };
        }, [])
    );

    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <Spacer size={"$5"}/>
                <Image source={logoPath} maxHeight={60} maxWidth={60} resizeMode={"contain"}/>
                <Spacer size={"$2"}/>
                <H2>Verificare cod</H2>
                <Paragraph>Introdu codul unic de autentificare primit prin SMS</Paragraph>
                <Spacer size={"$10"}/>
                <Form flex={1} justifyContent={"space-between"} flexDirection={"column"}
                      onSubmit={handleOTPSubmit}>
                    <OTPInput setStoreOTPCode={setOTPCode}/>
                    <FormTrigger asChild>
                        <MainButton text={"Autentificare"}/>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
