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
        setOtpCode((prevOtpCode) => {
            const newOtpCode = prevOtpCode.split("");
            newOtpCode[index] = value;
            return newOtpCode.join("");
        });

        // Move focus to the next input field
        const nextIndex = index + 1;
        if ((value !== "" && inputRefs.current[nextIndex])) {
            inputRefs.current[nextIndex].focus();
        }

        // Move focus to the previous input field if value is deleted and index > 0
        else if (value === "" && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }

        // Last input should not move focus to the next input field
        else if (value !== "" && !inputRefs.current[nextIndex]) {
            inputRefs.current[index].blur();
        }
    };

    const handleInputFocus = (index) => {
        const input = inputRefs.current[index];
        if (input) {
            input.setSelection(0, 1); // select all input when focused
            input.focus();
        }
    };

    const handleOTPKeyDown = (event, index) => {
        // move focus to the previous input field if backspace is pressed and index > 0
        if (event.nativeEvent.key === 'Backspace' && index > 0 && !otpCode[index]) {
            const prevIndex = index - 1;
            if (prevIndex >= 0 && inputRefs.current[prevIndex]) {
                inputRefs.current[prevIndex].setSelection(0, 1);
                inputRefs.current[prevIndex].focus();
            }
        }
    };


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
                      onSubmit={() => console.log("Validare OTP:", otpCode)}>
                    {/*TODO: Make the OTP XStack more responsive*/}
                    <XStack justifyContent={"space-between"}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <Input
                                focusStyle={{borderColor: "$orange9"}}
                                caretHidden={true}
                                selectionColor={"transparent"}
                                key={index}
                                cursorColor={"orange"}
                                borderColor={"gray"}
                                height={"$7"}
                                width={"$4"}
                                maxLength={1}
                                keyboardType={"number-pad"}
                                textAlign={"center"}
                                padding={0}
                                fontSize={"$8"}
                                onChangeText={(value) => handleOTPChange(value, index)}
                                onFocus={() => handleInputFocus(index)}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                onKeyPress={(event) => handleOTPKeyDown(event, index)}
                            />
                        ))}
                    </XStack>
                    <FormTrigger asChild>
                        <MainButton text={"Autentificare"}/>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
