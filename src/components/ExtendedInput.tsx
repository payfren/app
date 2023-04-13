import {Input, Paragraph, Spacer, YStack} from "tamagui";

export default function ExtendedInput({label, ...props}) {
    return (
        <YStack>
            <Paragraph>{label}</Paragraph>
            <Spacer size={"$2"}/>
            <Input {...props}/>
        </YStack>
    );
}
