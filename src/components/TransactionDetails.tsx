import {Avatar, H5, H6, Paragraph, Spacer, XStack, YStack} from "tamagui";

export default function TransactionDetails({payeeImage, payeeName, transactionDate, transactionAmount, transactionCurrency}: {
    payeeImage: string,
    payeeName: string,
    transactionDate: string,
    transactionAmount: string,
    transactionCurrency: string
}) {
    return (
        <YStack backgroundColor={"$gray3"} height={"$8"} justifyContent={"center"} borderRadius={10}>
            <XStack alignItems={"center"}>
                <Spacer/>
                <Avatar circular size="$6">
                    <Avatar.Image source={{uri: payeeImage}}/>
                    <Avatar.Fallback backgroundColor={"$gray5"}/>
                </Avatar>
                <Spacer/>
                <YStack>
                    <H6>{payeeName}</H6>
                    <Paragraph fontSize={"$3"} lineHeight={15}>{transactionDate}</Paragraph>
                    <Spacer size={"$2"}/>
                    <H5>{transactionAmount} {transactionCurrency}</H5>
                    <Spacer size={"$1"}/>
                </YStack>
            </XStack>
        </YStack>
    )
}
