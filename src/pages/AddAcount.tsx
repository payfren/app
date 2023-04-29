import Layout from "../components/Layout.tsx";
import {H2, Paragraph, Spacer, YStack, Spinner} from "tamagui";
import Logo from "../components/Logo.tsx";
import {ScrollView} from "react-native";
import useAvailableBanks from "../serverStore/getAvailableBanks.ts";
import AddBankButton from "../components/AddBankButton.tsx";

export default function AddAccount() {
    const {data: availableBanks} = useAvailableBanks();

    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <Spacer size={"$5"}/>
                <Logo/>
                <Spacer size={"$2"}/>
                <H2>Adaugă cont bancar</H2>
                <Paragraph>Selectează una din băncile disponibile pentru conectare în Payfren</Paragraph>
                <Spacer size={"$5"}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {availableBanks?.map((bank, index) => (
                        <React.Fragment key={index}>
                            <AddBankButton bankName={bank.name} bankId={bank.id}/>
                            <Spacer/>
                        </React.Fragment>
                    )) ?? <Spinner color={"$color"}/>}
                </ScrollView>
            </YStack>
        </Layout>
    )
}
