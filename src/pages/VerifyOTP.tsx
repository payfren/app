import Layout from "../components/Layout";
import {Form, FormTrigger, H2, Paragraph, Spacer, Spinner, YStack} from "tamagui";
import MainButton from "../components/MainButton";
import {useCallback, useState} from "react";
import OTPInput from "../components/OTPInput";
import {useStoreHandlers} from "../lib/useStoreHandlers";
import {useFocusEffect, useRouter, useSearchParams} from "expo-router";
import Logo from "../components/Logo";
import validateOTPCode from "../lib/validateOTPCode";
import supabase from "../lib/supabase";

export default function VerifyOTP() {
    const router = useRouter();
    const {from} = useSearchParams();
    const {setOTPCode, getOTPCode, getPhoneNumber} = useStoreHandlers(from);
    const [status, setStatus] = useState<'off' | 'processing'>('off');

    const handleOTPSubmit = async () => {
        setStatus('processing');
        const otpCode = getOTPCode();
        const isValid = otpCode && /^[0-9]{6}$/.test(otpCode);
        if (isValid) {
            const phoneNumber = getPhoneNumber();
            await validateOTPCode(otpCode, phoneNumber)
                .then(async (response) => {
                    if (response) {
                        const user = await supabase.auth.getUser();
                        console.log("User authenticated: ", user);
                        router.push({pathname: "/home"});
                    }
                });
        }
        setStatus('off');
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
                <Logo/>
                <Spacer size={"$2"}/>
                <H2>Verificare cod</H2>
                <Paragraph>Introdu codul unic de autentificare primit prin SMS</Paragraph>
                <Spacer size={"$10"}/>
                <Form flex={1} justifyContent={"space-between"} flexDirection={"column"}
                      onSubmit={handleOTPSubmit}>
                    <OTPInput setStoreOTPCode={setOTPCode}/>
                    <FormTrigger asChild disabled={status !== 'off'}>
                        <MainButton icon={status === 'processing' && <Spinner color={"$color"}/>}
                                    text={"Autentificare"}/>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
