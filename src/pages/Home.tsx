import React, {useEffect, useState} from 'react';
import {ScrollView} from "react-native";
import {Button, H3, Paragraph, Spacer, Spinner, XStack, YStack} from 'tamagui';
import Layout from '../../src/components/Layout';
import supabase from '../lib/supabase';
import Logo from "../components/Logo";
import {User} from "@tamagui/lucide-icons";
import {Link} from "expo-router";
import AccountDetails from "../components/AccountDetails";
import MainButton from "../components/MainButton";
import AppLoading from "./AppLoading";
import getBankAccounts from "../serverStore/getBankAccounts";

const transactions = [
    {
        payeeImage: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQo4Q-lC7esLJfB6qz-8sBmdWbPVllmqLMEio6m8Q7SqJeoEx0%26s&sp=1682625367T6512aae911b48896c9a9af31390ce629807f39df3c0a7f589fa1ca1080fc9727',
        payeeName: 'Starbucks Victoriei',
        transactionDate: '12.04.2021, 09:11',
        transactionAmount: '-34,20',
        transactionCurrency: 'RON',
    },
    {
        payeeImage: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fbakeria.ro%2Fwp-content%2Fuploads%2F2021%2F04%2Fwww.bakeria.ro-brutarie-artizanala-01-2021.png&sp=1682625534Tf64c8491483cbfb6f94edaf68032a96554137e114b16e71fc18a289dec42ed0f',
        payeeName: 'Bakeria Panduri',
        transactionDate: '11.04.2021, 09:00',
        transactionAmount: '-12,00',
        transactionCurrency: 'RON',
    },
    {
        payeeImage: 'https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fyt3.googleusercontent.com%2Fytc%2FAGIKgqNoNRD8Y7-ydomwccOXCRsrtM3SVG1veHCKxN5IOg%3Ds900-c-k-c0x00ffffff-no-rj&sp=1682625435Tbe84e34184530a61980e4c388a9b8b0984a1b93b02cfef90503c13a0bdc98b26',
        payeeName: 'Apple',
        transactionDate: '11.04.2021, 12:00',
        transactionAmount: '-49,99',
        transactionCurrency: 'RON',
    },
];


export default function Home() {
    const [user, setUser] = useState(null);
    const {isLoading, error, data} = getBankAccounts();

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await supabase.auth.getSession();
            setUser(currentUser.data.session.user);
        };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <AppLoading/>
        );
    }

    return (
        <Layout>
            <ScrollView>
                <YStack justifyContent={"flex-start"} flex={1}>
                    <Spacer size={"$5"}/>
                    <XStack justifyContent={"space-between"} alignItems={"center"}>
                        <Logo/>
                        <Link href={"/home/settings"} asChild>
                            <Button borderRadius={100} icon={User} height={60} width={60}/>
                        </Link>
                    </XStack>
                    <Spacer size={"$5"}/>
                    <H3>Bine ai venit, {user.user_metadata.given_name}!</H3>
                    <Paragraph>Lista conturilor tale:</Paragraph>
                    <Spacer size={"$2"}/>
                    {/*TODO: Replace mock-up data with real data from database*/}
                    {data?.map((account, index) => (
                        <React.Fragment key={index}>
                            <AccountDetails
                                bankLogo={account.bank_logo}
                                bankBalance={account.balance}
                                bankCurrency={account.currency}
                                bankIBAN={account.iban}
                                bankName={account.bank_name}
                            />
                            <Spacer/>
                        </React.Fragment>
                    )) ?? <Spinner color={"$color"}/>}
                    <MainButton text={"Adaugă cont"}/>
                    <Spacer size={"$5"}/>
                    <Paragraph>Tranzacții recente:</Paragraph>
                    <Spacer size={"$2"}/>
                    {transactions.map((transaction, index) => (
                        <React.Fragment key={index}>
                            <AccountDetails
                                bankLogo={transaction.payeeImage}
                                bankBalance={transaction.transactionAmount}
                                bankCurrency={transaction.transactionCurrency}
                                bankIBAN={transaction.transactionDate}
                                bankName={transaction.payeeName}
                            />
                            <Spacer/>
                        </React.Fragment>
                    ))}
                </YStack>
            </ScrollView>
        </Layout>
    );
}
