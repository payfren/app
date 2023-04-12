import Layout from "../components/Layout";
import {Form, FormTrigger, H2, Image, Input, Paragraph, Spacer, XStack, YStack} from "tamagui";
import {Appearance} from "react-native";
import MainButton from "../components/MainButton";
import {useRef, useState} from "react";

export default function VerifyOTPPage() {
    const lightLogo = require("../../assets/logoLight.png");
    const darkLogo = require("../../assets/logoDark.png");
    let logoPath = Appearance.getColorScheme() === "dark" ? lightLogo : darkLogo;

    const inputRefs = useRef([]);
    const [otpCode, setOtpCode] = useState('');

    const handleOTPChange = (value, index) => {
        const newOtpCode = otpCode.split('');
        newOtpCode[index] = value;
        setOtpCode(newOtpCode.join(''));
        const prevIndex = index - 1;
        const nextIndex = index + 1;
        // move focus to the next input field if a value is entered
        if (value && inputRefs.current[nextIndex]) {
            inputRefs.current[nextIndex].focus();
        }
        // move focus to the previous input field if value is deleted
        else if (!value && inputRefs.current[prevIndex]) {
            inputRefs.current[prevIndex].focus();
        }
    };


    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <Image source={logoPath} maxHeight={60} maxWidth={60} resizeMode={"contain"}/>
                <Spacer size={"$2"}/>
                <H2>Autentificare</H2>
                <Paragraph>Introdu codul unic de autentificare primit prin SMS</Paragraph>
                <Spacer size={"$10"}/>
                <Form onSubmit={() => console.log("Validare OTP:", otpCode)}>
                    <XStack justifyContent={"space-between"}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <Input
                                key={index}
                                cursorColor={"orange"}
                                height={"$7"}
                                width={"$4"}
                                maxLength={1}
                                keyboardType={"numeric"}
                                textAlign={"center"}
                                padding={0}
                                fontSize={"$8"}
                                onChangeText={(value) => handleOTPChange(value, index)}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                            />
                        ))}
                    </XStack>
                    <Spacer size={"$10"}/>
                    <FormTrigger asChild>
                        <MainButton text={"Înregistrare"}/>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
