import {Button} from "tamagui";

export default function SecondaryButton({text, flexSize}: { text: string, flexSize: number }) {
    return <Button flex={flexSize}>{text}</Button>;
}
