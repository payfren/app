import React, {useEffect, useState} from 'react';
import {Button, H3, Paragraph, Spacer, Spinner, XStack, YStack} from 'tamagui';
import Layout from '../../src/components/Layout';
import supabase from '../lib/supabase';
import Logo from "../components/Logo";
import {User} from "@tamagui/lucide-icons";
import {Link} from "expo-router";
import AccountDetails from "../components/AccountDetails";
import MainButton from "../components/MainButton";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await supabase.auth.getSession();
            setUser(currentUser.data.session.user);
        };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <Layout>
                <YStack justifyContent={'center'} alignContent={"center"} flex={1}>
                    <Spinner color={"$color"}/>
                </YStack>
            </Layout>
        );
    }

    return (
        <Layout>
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
                <AccountDetails
                    bankLogo={"https://yt3.googleusercontent.com/ytc/AGIKgqPSdwWMS8LjwhkUu9LmT0Vak2oFAAzu3lttcRBkqQ=s176-c-k-c0x00ffffff-no-rj"}
                    bankBalance={"1.000,10"} bankCurrency={"RON"} bankIBAN={"RO74 BACX 0000 0021 3379 8000"}
                    bankName={"Unicredit Bank S.A."}/>
                <Spacer/>
                <AccountDetails
                    bankLogo={"https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1656973981459461~c5_100x100.jpeg?x-expires=1682787600&x-signature=fGWffjvk%2FB%2Bu8QC6eo2z9Czi8Cs%3D"}
                    bankBalance={"249,61"} bankCurrency={"RON"} bankIBAN={"RO74 INGB 0000 0000 0000 0000"}
                    bankName={"ING BANK N.V."}/>
                <Spacer/>
                <MainButton text={"Adaugă cont"}/>
                <Spacer size={"$5"}/>
                <Paragraph>Tranzacții recente:</Paragraph>
            </YStack>
        </Layout>
    );
}
