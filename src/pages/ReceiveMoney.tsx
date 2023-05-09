import React, { useState, useEffect } from 'react';
import {H3, Paragraph, Spacer, Spinner, XStack, YStack} from 'tamagui';
import useUserProfile from '../serverStore/getUserProfile';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { useColorScheme } from 'react-native';
import Layout from '../components/Layout';
import Logo from "../components/Logo";

export default function ReceiveMoney() {
    const { data: user, isLoading: isLoadingProfile } = useUserProfile();
    const [qrCodeReady, setQrCodeReady] = useState(false);

    const logo = require('../../assets/icon.png');
    const colorScheme = useColorScheme();
    const paymentLink = `payfren://home/pay/${user.user_id}`;

    useEffect(() => {
        if (!isLoadingProfile) {
            // Simulate async QR code generation
            setTimeout(() => {
                setQrCodeReady(true);
            }, 500);
        }
    }, [isLoadingProfile]);

    return (
        <Layout>
            <YStack flex={1} justifyContent={'center'} alignItems={'center'}>
                <XStack>
                    <Logo />
                </XStack>
                <H3>Primește bani</H3>
                <Paragraph textAlign={'center'}>
                    Folosește codul tău sau numărul de telefon asociat contului pentru a primi bani
                </Paragraph>
                <Spacer />
                {isLoadingProfile || !qrCodeReady ? (
                    <Spinner color={'$color'} />
                ) : (
                    <QRCode
                        content={paymentLink}
                        color={colorScheme === 'light' ? 'black' : 'white'}
                        logo={logo}
                        logoSize={70}
                        ecl={'H'}
                    />
                )}
                <Spacer />
                <Paragraph textAlign={'center'}>
                    Numărul tău este:{' '}
                    <Paragraph fontWeight={'bold'}>{user.phone_number}</Paragraph>
                </Paragraph>
            </YStack>
        </Layout>
    );
}
