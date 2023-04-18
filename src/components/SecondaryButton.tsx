import {Button} from "tamagui";
import React from 'react';

interface SecondaryButtonProps {
    text: string;
    flexSize?: number;
    onPress?: () => void;
}

const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
    ({text, flexSize, onPress}, ref) => {
        return (
            <Button theme={"gray"} flex={flexSize} onPress={onPress} ref={ref}>
                {text}
            </Button>
        );
    }
);

export default SecondaryButton;
