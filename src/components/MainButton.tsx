import {Button} from "tamagui";
import React from 'react';

interface MainButtonProps {
    text: string;
    flexSize?: number;
    onPress?: () => void;
    icon?: JSX.Element;
    maxWidth?: number;
}

const MainButton = React.forwardRef<HTMLButtonElement, MainButtonProps>(({text, flexSize, onPress, icon, maxWidth}, ref) => {
    return (
        <Button
            ref={ref}
            flex={flexSize}
            theme={"orange"}
            onPress={onPress}
            icon={icon}
            maxWidth={maxWidth}
        >
            {text}
        </Button>
    );
});

export default MainButton;
