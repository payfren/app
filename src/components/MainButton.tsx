import {Button} from "tamagui";
import React from 'react';

interface MainButtonProps {
    text: string;
    flexSize?: number;
    onPress?: () => void;
}

const MainButton = React.forwardRef<HTMLButtonElement, MainButtonProps>(({text, flexSize, onPress}, ref) => {
    return (
        <Button
            ref={ref}
            flex={flexSize}
            theme={"orange"}
            onPress={onPress}
        >
            {text}
        </Button>
    );
});

export default MainButton;
