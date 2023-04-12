import {Button} from "tamagui";

export default function MainButton({text, flexSize, onPress}: { text: string, flexSize?: number, onPress?: () => void }) {
    return <Button flex={flexSize} theme={"orange"} onPress={onPress}>{text}</Button>;
}
