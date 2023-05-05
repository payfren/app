import {Fragment, useState} from 'react';
import {RefreshControl, ScrollView} from "react-native";
import {Button, H3, Paragraph, Sheet, Spacer, Spinner, XStack, YStack} from 'tamagui';
import Layout from '../../src/components/Layout';
import supabase from '../lib/supabase';
import Logo from "../components/Logo";
import {ChevronDown, QrCode, User} from "@tamagui/lucide-icons";
import {Link, useRouter, useSearchParams} from "expo-router";
import AccountDetails from "../components/AccountDetails";
import MainButton from "../components/MainButton";
import AppLoading from "./AppLoading";
import getUserBankAccounts from "../serverStore/getUserBankAccounts";
import TransactionDetails from "../components/TransactionDetails";
import SecondaryButton from "../components/SecondaryButton";
import useUserProfile from "../serverStore/getUserProfile";
import ReceiveMoney from "./ReceiveMoney";
import SendMoney from "./SendMoney";

const transactions = [
    {
        payeeImage: 'https://images.crowdspring.com/blog/wp-content/uploads/2022/09/07053059/62bc70600acc8f22bbf77370_starbucks-logo.png',
        payeeName: 'Starbucks Victoriei',
        transactionDate: '12.04.2021, 09:11',
        transactionAmount: '-34,20',
        transactionCurrency: 'RON',
    },
    {
        payeeImage: 'https://bakeria.ro/wp-content/uploads/2021/04/www.bakeria.ro-brutarie-artizanala-01-2021.png',
        payeeName: 'Bakeria Panduri',
        transactionDate: '11.04.2021, 12:09',
        transactionAmount: '-12,00',
        transactionCurrency: 'RON',
    },
    {
        payeeImage: 'https://yt3.googleusercontent.com/ytc/AGIKgqNoNRD8Y7-ydomwccOXCRsrtM3SVG1veHCKxN5IOg=s176-c-k-c0x00ffffff-no-rj',
        payeeName: 'Apple',
        transactionDate: '11.04.2021, 12:00',
        transactionAmount: '-49,99',
        transactionCurrency: 'RON',
    },
];


export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const {data: user, isLoading: isLoadingProfile} = useUserProfile();
    const {data: bankAccounts, isLoading: isLoadingBankAccounts, refetch: refetchBankAccounts} = getUserBankAccounts();
    const {finished_consent_flow, ref} = useSearchParams();
    const router = useRouter();

    const [openReceiveMoney, setOpenReceiveMoney] = useState(false)
    const [openSendMoney, setOpenSendMoney] = useState(false)
    const handleRedirectFromConsent = async (consentRef) => {
        const {error} = await supabase.functions.invoke('verify_requisition', {
            body: {
                consent_id: consentRef,
            }
        });
        if (error) {
            console.log(error);
        }
    };

    const reloadBankAccounts = () => {
        setRefreshing(true);
        refetchBankAccounts().then(() => {
            setRefreshing(false);
        });
    }

    if (finished_consent_flow === 'true') {
        handleRedirectFromConsent(ref).then(() => {
            reloadBankAccounts()
        });
        router.replace('/home');
    }

    if (isLoadingProfile) {
        return (
            <AppLoading/>
        );
    }

    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} refreshControl={
                    <RefreshControl refreshing={refreshing || isLoadingBankAccounts} onRefresh={reloadBankAccounts}/>}>
                    <Spacer size={"$5"}/>
                    <XStack justifyContent={"space-between"} alignItems={"center"}>
                        <Logo/>
                        <Link href={"/home/profile"} asChild>
                            <Button borderRadius={100} icon={User} height={60} width={60}/>
                        </Link>
                    </XStack>
                    <Spacer size={"$5"}/>
                    <H3>Bine ai venit, {user.given_name}!</H3>
                    <Paragraph>Lista conturilor tale:</Paragraph>
                    <Spacer size={"$2"}/>
                    {bankAccounts?.map((account, index) => (
                        <Fragment key={index}>
                            <AccountDetails
                                bankLogo={account.bank_logo}
                                bankBalance={account.balance}
                                bankCurrency={account.currency}
                                bankIBAN={account.iban}
                                bankName={account.bank_name}
                            />
                            <Spacer/>
                        </Fragment>
                    )) ?? <Fragment>
                        <Spacer size={"$3"}/>
                        <Spinner color={"$color"}/>
                        <Spacer size={"$5"}/>
                    </Fragment>}
                    <Link href={"/home/add-account"} asChild>
                        <MainButton text={"Adaugă cont"}/>
                    </Link>
                    <Spacer size={"$5"}/>
                    <Paragraph>Tranzacții recente:</Paragraph>
                    <Spacer size={"$2"}/>
                    {/*TODO: Replace mock-up data with real data from database*/}
                    {transactions.map((transaction, index) => (
                        <Fragment key={index}>
                            <TransactionDetails
                                payeeImage={transaction.payeeImage} payeeName={transaction.payeeName}
                                transactionDate={transaction.transactionDate}
                                transactionAmount={transaction.transactionAmount}
                                transactionCurrency={transaction.transactionCurrency}/>
                            <Spacer/>
                        </Fragment>
                    ))}
                </ScrollView>
                <Spacer size={"$3"}/>
                <XStack>
                    <MainButton text={"Plătește"} flexSize={0.5} onPress={() => setOpenSendMoney(true)}/>
                    <Spacer size={"$3"}/>
                    <SecondaryButton text={"Primește"} flexSize={0.5} onPress={() => setOpenReceiveMoney(true)}/>
                </XStack>
            </YStack>
            <SendMoney open={openSendMoney} setOpen={setOpenSendMoney}/>
            <ReceiveMoney open={openReceiveMoney} setOpen={setOpenReceiveMoney}/>
        </Layout>
    );
}
