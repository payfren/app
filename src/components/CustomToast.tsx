import {Toast, useToastState} from "@tamagui/toast";
import {YStack} from "tamagui";

export default function CustomToast({showToast}) {
    const currentToast = useToastState()
    if (!currentToast) return null
    return (showToast &&
        <Toast
            key={currentToast.id}
            duration={currentToast.duration}
            enterStyle={{opacity: 0, scale: 0.5, y: -25}}
            exitStyle={{opacity: 0, scale: 1, y: -20}}
            y={0}
            opacity={1}
            scale={1}
            animation="quick"
            viewportName={currentToast.viewportName}
            theme={"red"}
        >
            <YStack>
                <Toast.Title textAlign={"center"} fontSize={"$5"}>{currentToast.title}</Toast.Title>
                {!!currentToast.message && (
                    <Toast.Description fontSize={"$3"}>{currentToast.message}</Toast.Description>
                )}
            </YStack>
        </Toast>
    )
}
