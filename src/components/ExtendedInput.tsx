import {Input, Paragraph, Spacer, YStack} from "tamagui";
import {useState} from "react";

export default function ExtendedInput({label, getValue, setValue, ...props}) {
    const [inputValue, setInputValue] = useState(getValue());

    const handleChange = (text: string) => {
        setInputValue(text);
        setValue(text);
    }

    return (
        <YStack>
            <Paragraph>{label}</Paragraph>
            <Spacer size={"$2"}/>
            <Input {...props} onChangeText={handleChange} value={inputValue}/>
        </YStack>
    );
}
