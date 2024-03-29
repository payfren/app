import React, {useState} from 'react';
import {Input, Paragraph, Spacer, XStack, YStack} from 'tamagui';

export default function PhoneNumberInput({getPhoneNumber, setPhoneNumber, maxWidth} : {getPhoneNumber: () => string, setPhoneNumber: (phoneNumber: string) => void, maxWidth?: number}) {
    const [inputValue, setInputValue] = useState(getPhoneNumber());

    {/*TODO: Rewrite this function to make it cleaner*/
    }
    const handlePhoneNumberChange = (text: string) => {
        let formattedPhoneNumber = text.replace(/[^\d+]/g, '');
        if (formattedPhoneNumber.length <= 2) {
            setInputValue('+40 ');
            return;
        }
        if (formattedPhoneNumber.startsWith('+40')) {
            formattedPhoneNumber = formattedPhoneNumber.slice(3);
        }
        if (formattedPhoneNumber.length > 10) {
            formattedPhoneNumber = formattedPhoneNumber.substring(0, 10);
        }
        if (formattedPhoneNumber.length === 0) {
            setPhoneNumber('');
        }
        formattedPhoneNumber = '+40' + formattedPhoneNumber;
        if (formattedPhoneNumber.length > 3) {
            formattedPhoneNumber =
                formattedPhoneNumber.substring(0, 3) +
                ' ' +
                formattedPhoneNumber.substring(3);
        }
        if (formattedPhoneNumber.length > 7) {
            formattedPhoneNumber =
                formattedPhoneNumber.substring(0, 7) +
                ' ' +
                formattedPhoneNumber.substring(7);
        }
        if (formattedPhoneNumber.length > 11) {
            formattedPhoneNumber =
                formattedPhoneNumber.substring(0, 11) +
                ' ' +
                formattedPhoneNumber.substring(11);
        }
        setInputValue(formattedPhoneNumber);
        setPhoneNumber(formattedPhoneNumber);
    };

    return (
        <YStack>
            <Paragraph>Număr de telefon</Paragraph>
            <Spacer size={'$2'}/>
            <XStack maxWidth={maxWidth}>
                <Input width={"100%"}
                       cursorColor={'orange'}
                       keyboardType={'phone-pad'}
                       maxLength={15}
                       onChangeText={handlePhoneNumberChange}
                       value={inputValue}
                />
            </XStack>
        </YStack>
    );
}
