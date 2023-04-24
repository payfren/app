import {Button} from "tamagui";
import React from 'react';

interface MainButtonProps {
    text: string;
    flexSize?: number;
    onPress?: () => void;
    icon?: JSX.Element;
}

const MainButton = React.forwardRef<HTMLButtonElement, MainButtonProps>(({text, flexSize, onPress, icon}, ref) => {
    return (
        <Button
            ref={ref}
            flex={flexSize}
            theme={"orange"}
            onPress={onPress}
            icon={icon}
        >
            {text}
        </Button>
    );
});

export default MainButton;
