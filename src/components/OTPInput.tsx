import {Input, XStack} from "tamagui";
import {useRef, useState} from "react";

export default function OTPInput({setStoreOTPCode})
{
    const inputRefs = useRef([]);
    const [otpCode, setOtpCode] = useState(Array(6).fill(''));

    const handleOTPChange = (value, index) => {
        // Update the otpCode with the new value at the given index
        const newOtpCode = [...otpCode];
        newOtpCode[index] = value;
        setOtpCode(newOtpCode);
        setStoreOTPCode(newOtpCode.join(''));

        // If the value is not empty and the index is not the last one, focus on the next input
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        else if (index === inputRefs.current.length - 1) {
            // If the current input is the last one, blur the input
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
        const {key} = event.nativeEvent;
        if (key.match(/^\d$/)) { // Check if the pressed key is a digit
            handleOTPChange(key, index);
        } else if (key === 'Backspace') {
            if (otpCode[index]) {
                otpCode[index] = ''; // Clear the value of the current input
                setOtpCode([...otpCode]); // Update the state with the modified otpCode array
                setStoreOTPCode(otpCode.join(''));
            } else {
                const prevIndex = index - 1;
                if (prevIndex >= 0 && inputRefs.current[prevIndex]) {
                    inputRefs.current[prevIndex].setSelection(0, 1);
                    inputRefs.current[prevIndex].focus();
                }
            }
        }
    };

    {/*TODO: Make the OTP Input component more responsive*/}
    return (
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
    );
}
