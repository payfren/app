import Layout from "../components/Layout";
import {Form, FormTrigger, H2, Image, Input, Paragraph, Spacer, XStack, YStack} from "tamagui";
import {Appearance} from "react-native";
import MainButton from "../components/MainButton";
import {useMemo, useRef, useState} from "react";

export default function VerifyOTP() {
    const lightLogo = require("../../assets/logoLight.png");
    const darkLogo = require("../../assets/logoDark.png");
    const logoPath = useMemo(() => {
        return Appearance.getColorScheme() === "dark" ? lightLogo : darkLogo;
    }, [Appearance.getColorScheme()]);
    const inputRefs = useRef([]);
    const [otpCode, setOtpCode] = useState(Array(6).fill(''));

    const handleOTPChange = (value, index) => {
        // Update the otpCode with the new value at the given index
        const newOtpCode = [...otpCode];
        newOtpCode[index] = value;
        setOtpCode(newOtpCode);

        // If the value is not empty and the index is not the last one, focus on the next input
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
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
        const {key} = event.nativeEvent;
        if (key.match(/^\d$/)) { // Check if the pressed key is a digit
            handleOTPChange(key, index);
        } else if (key === 'Backspace') {
            if (otpCode[index]) {
                otpCode[index] = ''; // Clear the value of the current input
                setOtpCode([...otpCode]); // Update the state with the modified otpCode array
            } else {
                const prevIndex = index - 1;
                if (prevIndex >= 0 && inputRefs.current[prevIndex]) {
                    inputRefs.current[prevIndex].setSelection(0, 1);
                    inputRefs.current[prevIndex].focus();
                }
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
                      onSubmit={() => console.log("Validare OTP:", otpCode.join(""))}>
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
                                width={"13%"}
                                maxLength={1}
                                keyboardType={"number-pad"}
                                textAlign={"center"}
                                padding={0}
                                fontSize={"$8"}
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
