import Layout from "../components/Layout";
import {Form, FormTrigger, H2, Paragraph, Spacer, Spinner, YStack} from "tamagui";
import MainButton from "../components/MainButton";
import React, {useCallback, useState} from "react";
import OTPInput from "../components/OTPInput";
import {useStoreHandlers} from "../lib/useStoreHandlers";
import {useFocusEffect, useRouter, useSearchParams} from "expo-router";
import Logo from "../components/Logo";
import verifyOTPCode from "../lib/verifyOTPCode";
import createUserProfile from "../lib/createUserProfile";
import cleanLoginStore from "../lib/cleanLoginStore";
import cleanSignUpStore from "../lib/cleanSignUpStore";
import CustomToast from "../components/CustomToast";
import {ToastViewport, useToastController} from "@tamagui/toast";

export default function VerifyOTP() {
    const router = useRouter();
    const {from} = useSearchParams();
    const {setOTPCode, getOTPCode, getPhoneNumber} = useStoreHandlers(from);
    const [status, setStatus] = useState<'off' | 'processing'>('off');
    const [showToast, setShowToast] = useState(false);
    const toast = useToastController();
    const showErrorToast = (message) => {
        toast.show('Eroare', {
            message: message,
            duration: 2000,
            burntOptions: {
                haptic: "error"
            }
        })
        if (!showToast)
            setShowToast(true)
    }
    const handleOTPSubmit = async () => {
        setStatus('processing');
        const otpCode = getOTPCode();
        const isValid = otpCode && /^[0-9]{6}$/.test(otpCode);
        if (isValid) {
            const phoneNumber = getPhoneNumber();
            await verifyOTPCode(otpCode, phoneNumber)
                .then(async (response) => {
                    if (response) {
                        // After we have obtained a valid session for the new user, we can create their profile
                        if (from === 'signup') {
                            createUserProfile().then(() => {
                                cleanSignUpStore();
                                router.push({pathname: "/home"});
                            });
                        } else {
                            cleanLoginStore();
                            router.push({pathname: "/home"});
                        }
                    }
                });
        }
        else {
            showErrorToast("Codul introdus nu este valid!");
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
            <CustomToast showToast={showToast}/>
            <ToastViewport alignSelf={"center"} marginTop={"$7"}/>
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
