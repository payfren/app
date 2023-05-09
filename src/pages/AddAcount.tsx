import Layout from "../components/Layout";
import {H2, Paragraph, Spacer, Spinner, YStack} from "tamagui";
import Logo from "../components/Logo";
import {ScrollView} from "react-native";
import useAvailableBanks from "../serverStore/getAvailableBanks";
import AddBankButton from "../components/AddBankButton";
import {Fragment} from "react";

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
                    {/*TODO: Lock all buttons if one of them is pressed*/}
                    {availableBanks?.map((bank, index) => (
                        <Fragment key={index}>
                            <AddBankButton bankName={bank.name} bankId={bank.id}/>
                            <Spacer/>
                        </Fragment>
                    )) ?? <Spinner color={"$color"}/>}
                </ScrollView>
            </YStack>
        </Layout>
    )
}
