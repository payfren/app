import {Button} from "tamagui";

export default function MainButton({text, flexSize}: { text: string, flexSize: number }) {
    return <Button flex={flexSize} theme={"orange"}>{text}</Button>;
}
