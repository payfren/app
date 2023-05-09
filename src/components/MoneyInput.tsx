import React, {useEffect, useState} from 'react';
import {Input, Label, Paragraph, Spacer, XStack, YStack} from 'tamagui';
import {useNavigation} from "expo-router";

const formatAmount = (priceString) => {
    let strippedString = priceString.replace('.', '');
    if ((strippedString.length < 4 || strippedString === '0000') && parseInt(strippedString, 10) === 0) {
        return '0.00';
    }
    let priceInt = (parseInt(strippedString, 10) / 100).toFixed(2);
    return String(priceInt);
};

export default function MoneyInput({ getAmount, setAmount }) {
    const [inputValue, setInputValue] = useState(formatAmount(getAmount().toFixed(2)));
    const navigation = useNavigation();

    useEffect(() => {
        return navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            // Reset the amount to 0 when the user leaves the page
            setAmount(0.00);
            navigation.dispatch(e.data.action);
        });
    }, []);

    useEffect(() => {
        setAmount(parseFloat(inputValue));
    }, [inputValue, setAmount]);

    const handleAmountChange = (text) => {
        const normalizedValue = formatAmount(text);
        setInputValue(normalizedValue);
    };

    return (
        <YStack>
            <Paragraph>Suma de plată</Paragraph>
            <Spacer size={'$2'} />
            <XStack>
                <XStack maxWidth={500}>
                    <Input
                        width={'90%'}
                        cursorColor={'orange'}
                        keyboardType={'phone-pad'}
                        maxLength={15}
                        onChangeText={handleAmountChange}
                        value={inputValue.toString()}
                    />
                </XStack>
                <Label>RON</Label>
            </XStack>
        </YStack>
    );
}
