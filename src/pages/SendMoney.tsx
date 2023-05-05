import {useState} from "react";
import {H3, Sheet} from "tamagui";

export default function SendMoney({open, setOpen}) {
    const [position, setPosition] = useState(0)

    return (
        <Sheet
            forceRemoveScrollEnabled={open}
            open={open}
            onOpenChange={setOpen}
            snapPoints={[80,]}
            dismissOnSnapToBottom
            position={position}
            onPositionChange={setPosition}
            zIndex={100_000}
            animation="bouncy"
        >
            <Sheet.Overlay/>
            <Sheet.Handle/>
            <Sheet.Frame
                flex={1}
                padding="$4"
                justifyContent="center"
                alignItems="center"
            >
                <H3>Plătește bani</H3>
            </Sheet.Frame>
        </Sheet>
    );
}
