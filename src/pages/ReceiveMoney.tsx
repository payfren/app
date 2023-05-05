import {H3, Paragraph, Sheet, Spacer, Spinner} from "tamagui";
import {useState} from "react";
import useUserProfile from "../serverStore/getUserProfile";
import { QRCode } from 'react-native-custom-qr-codes-expo';

export default function ReceiveMoney({open, setOpen}) {
    const [position, setPosition] = useState(0);
    const {data, isLoading} = useUserProfile();
    const logo = require("../../assets/icon.png");

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
                <H3>Primește bani</H3>
                <Paragraph textAlign={"center"}>Folosește codul tău sau numârul de telefon pentru a primi bani</Paragraph>
                <Spacer/>
                {isLoading ? <Spinner color={"$color"}/> : <QRCode content={data?.phone_number} logo={logo}/>}
            </Sheet.Frame>
        </Sheet>
    );
}
