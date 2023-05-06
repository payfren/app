import {usePathname} from "expo-router";
import Layout from "../components/Layout";
import {Avatar, H3, Paragraph, Spacer, XStack, YStack} from "tamagui";
import Logo from "../components/Logo";
import supabase from "../lib/supabase";
import {useEffect, useState} from "react";
import AppLoading from "./AppLoading";
import {usePaymentStore} from "../clientStore/PaymentStore";
import MoneyInput from "../components/MoneyInput";
import MainButton from "../components/MainButton";

export default function PaymentConfirmation() {
    const path = usePathname()
    // Extract the user ID from the path, which is the part after /home/pay/
    const userId = path.slice(10);
    const [profileError, setProfileError] = useState(null);
    const [payeeProfile, setPayeeProfile] = useState(null);
    const {getAmount, setAmount} = usePaymentStore();

    const getPayeeProfile = async () => {
        const {data, error} = await supabase.from('profiles').select('*').eq('user_id', userId);
        if (error) {
            console.log(error);
            setProfileError(error.message);
            return;
        }
        return data[0];
    }

    useEffect(() => {
        getPayeeProfile().then(setPayeeProfile).catch(setProfileError);
    }, []);

    if (!payeeProfile && !profileError) {
        return (
            <AppLoading/>
        );
    }

    if (profileError) {
        return (
            <Layout>
                <YStack flex={1} justifyContent={'center'} alignItems={'center'}>
                    <XStack>
                        <Logo/>
                    </XStack>
                    <H3>Eroare</H3>
                    <Paragraph textAlign={'center'}>
                        {profileError}
                    </Paragraph>
                </YStack>
            </Layout>
        );
    }

    return (
        <Layout>
            <YStack flex={1} justifyContent={'center'} alignItems={'center'}>
                <XStack>
                    <Logo/>
                </XStack>
                <H3>Confirmare plată</H3>
                <Paragraph textAlign={'center'}>
                    Plată către {payeeProfile.given_name} {payeeProfile.family_name}
                </Paragraph>
                <Spacer/>
                <XStack justifyContent={"center"}>
                    <Avatar circular size="$10">
                        <Avatar.Image
                            source={{uri: payeeProfile.profile_photo}}/>
                        <Avatar.Fallback bc="$gray5"/>
                    </Avatar>
                </XStack>
                <Spacer/>
                <MoneyInput getAmount={getAmount} setAmount={setAmount}/>
                <Spacer size={"$7"}/>
                <XStack>
                    <MainButton text={"Efectuează plata"} flexSize={1} maxWidth={500}/>
                </XStack>
            </YStack>
        </Layout>
    );
}
