import React from 'react';
import {Input, Paragraph, Spacer, YStack} from 'tamagui';
import {useSignUpStore} from '../clientStore/SignUpStore';

export default function PhoneNumberInput() {
    const profile = useSignUpStore((state) => state.profile);
    const setProfile = useSignUpStore((state) => state.setProfile);

    const handlePhoneNumberChange = (text: string) => {
        let formattedPhoneNumber = text.replace(/[^\d+]/g, '');
        if (formattedPhoneNumber.startsWith('+40')) {
            formattedPhoneNumber = formattedPhoneNumber.slice(3); // Remove the "+40" prefix
        }

        // Limit the length to 10 digits (excluding the "+40" prefix)
        if (formattedPhoneNumber.length > 10) {
            formattedPhoneNumber = formattedPhoneNumber.substring(0, 10);
        }

        if (formattedPhoneNumber.length === 0) {
            setProfile({...profile, phoneNum: ''});
            return;
        }

        // Add the "+40" prefix
        formattedPhoneNumber = '+40' + formattedPhoneNumber;

        // Add spaces between the groups of numbers
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

        setProfile({...profile, phoneNum: formattedPhoneNumber});
    };

    return (
        <YStack>
            <Paragraph>Număr de telefon</Paragraph>
            <Spacer size={'$2'}/>
            <Input
                cursorColor={'orange'}
                keyboardType="phone-pad"
                maxLength={15}
                onChangeText={handlePhoneNumberChange}
                value={profile.phoneNum}
            />
        </YStack>
    );
}
