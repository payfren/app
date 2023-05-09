import {Button} from "tamagui";
import React from 'react';

interface SecondaryButtonProps {
    text: string;
    flexSize?: number;
    onPress?: () => void;
    maxWidth?: number;
}

const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
    ({text, flexSize, onPress, maxWidth}, ref) => {
        return (
            <Button
                theme={"gray"}
                flex={flexSize}
                onPress={onPress}
                ref={ref}
                maxWidth={maxWidth}
            >
                {text}
            </Button>
        );
    }
);

export default SecondaryButton;
