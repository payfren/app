import {Button} from "tamagui";

export default function SecondaryButton({text, flexSize, onPress}: { text: string, flexSize?: number, onPress?: () => void}) {
    return <Button theme={"gray"} flex={flexSize} onPress={onPress}>{text}</Button>;
}
