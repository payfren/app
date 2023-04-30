import {Avatar, H5, H6, Paragraph, Spacer, XStack, YStack} from "tamagui";

export default function AccountDetails({bankLogo, bankName, bankIBAN, bankBalance, bankCurrency}: {
    bankLogo: string,
    bankName: string,
    bankIBAN: string,
    bankBalance: string,
    bankCurrency: string
}) {
    return (
        <YStack backgroundColor={"$gray3"} height={"$8"} justifyContent={"center"} borderRadius={10}>
            <XStack alignItems={"center"}>
                <Spacer/>
                <Avatar circular size="$6">
                    <Avatar.Image source={{uri: bankLogo}}/>
                    <Avatar.Fallback backgroundColor={"$gray5"}/>
                </Avatar>
                <Spacer/>
                <YStack>
                    <H6>{bankName}</H6>
                    <Paragraph fontSize={"$3"} lineHeight={15}>{bankIBAN}</Paragraph>
                    <H5>{bankBalance} {bankCurrency}</H5>
                </YStack>
            </XStack>
        </YStack>
    )
}
