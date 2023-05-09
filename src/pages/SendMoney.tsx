import Layout from "../components/Layout";
import {H3, Paragraph, Spacer, Spinner, XStack, YStack} from "tamagui";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {Camera} from "expo-camera";
import {BarCodeScanner} from "expo-barcode-scanner";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {usePaymentStore} from "../clientStore/PaymentStore";
import SecondaryButton from "../components/SecondaryButton";
import MainButton from "../components/MainButton";
import Logo from "../components/Logo";
import {useNavigation, useRouter} from "expo-router";
import supabase from "../lib/supabase";
import CustomToast from "../components/CustomToast";
import {ToastViewport, useToastController} from "@tamagui/toast";

export default function SendMoney() {
    const [isLoadingPayee, setIsLoadingPayee] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [isPermissionRequested, setIsPermissionRequested] = useState(false);
    const [isScanning, setIsScanning] = useState(true);
    const {getPayeePhoneNumber, setPayeePhoneNumber} = usePaymentStore();
    const navigation = useNavigation();
    const router = useRouter();
    const toast = useToastController();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        return navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            // Reset the payee phone number when leaving this screen
            setPayeePhoneNumber('+40 ');
            navigation.dispatch(e.data.action);
        });
    }, []);

    const requestCameraPermission = useCallback(async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');
    }, []);

    useEffect(() => {
        if (!isPermissionRequested) {
            requestCameraPermission();
            setIsPermissionRequested(true);
        }
    }, [isPermissionRequested, requestCameraPermission]);

    const handleBarCodeScanned = useCallback((e) => {
        // If data doesn't start with "payfren://", it's not a valid QR code
        if (!e.data.startsWith("payfren://")) {
            return;
        }
        // Slice the "payfren:/" part
        const redirectTo = e.data.slice(9);
        router.push(redirectTo);
    }, []);

    const showErrorToast = (message) => {
        toast.show('Eroare', {
            message: message,
            duration: 2000,
            burntOptions: {
                haptic: "error"
            }
        })
        if (!showToast)
            setShowToast(true)
    }

    const handlePhoneNumberRedirect = async () => {
        setIsLoadingPayee(true);
        const {
            data,
            error
        } = await supabase.from('profiles').select('user_id').eq('phone_number', getPayeePhoneNumber());
        if (error) {
            showErrorToast(error.message);
            setIsLoadingPayee(false);
            return;
        }
        if (data.length === 0) {
            showErrorToast('Nu există utilizator cu acest număr!')
            setIsLoadingPayee(false);
            return;
        }
        const payeeId = data[0].user_id;
        const redirectTo = '/home/pay/' + payeeId;
        router.push(redirectTo);
        setPayeePhoneNumber('+40 ');
        setIsLoadingPayee(false);
    }

    return (
        <Layout>
            <CustomToast showToast={showToast}/>
            <ToastViewport alignSelf={"center"} marginTop={"$7"}/>
            <YStack flex={1} justifyContent={'center'} alignItems={'center'}>
                <XStack>
                    <Logo/>
                </XStack>
                <H3>Trimite bani</H3>
                <Paragraph textAlign={'center'}>
                    Scanează codul QR al destinatarului sau introdu numărul de telefon al acestuia
                </Paragraph>
                <Spacer size={'$5'}/>
                {hasCameraPermission && isScanning ? (
                    <Camera
                        onBarCodeScanned={handleBarCodeScanned}
                        barCodeScannerSettings={{
                            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                        }}
                        style={{flex: 0.5, aspectRatio: 1}}
                        type={Camera.Constants.Type['back']}
                    />
                ) : isScanning ? (
                    <Paragraph textAlign={"center"}>
                        Nu ai permisiunea de a folosi camera. Te rugăm să o activezi din setări.
                    </Paragraph>
                ) : (
                    <Fragment>
                        <Spacer size={'$7'}/>
                        <PhoneNumberInput setPhoneNumber={setPayeePhoneNumber} getPhoneNumber={getPayeePhoneNumber}
                                          maxWidth={500}/>
                        <Spacer size={'$7'}/>
                    </Fragment>
                )}
                <Spacer size={'$5'}/>
                <XStack>
                    {isScanning ? (
                        <SecondaryButton
                            onPress={() => setIsScanning(false)}
                            text={"Introdu număr de telefon"}
                            flexSize={1}
                            maxWidth={500}
                        />
                    ) : (
                        <SecondaryButton
                            onPress={() => setIsScanning(true)}
                            text={"Scanează codul QR"}
                            flexSize={1}
                            maxWidth={500}
                        />
                    )}
                </XStack>
                <Spacer/>
                <XStack>
                    {!isScanning ? (
                            <MainButton
                                icon={isLoadingPayee && <Spinner color={"$color"}/>}
                                text={"Continuă"}
                                flexSize={1}
                                onPress={handlePhoneNumberRedirect}
                                maxWidth={500}
                            />
                        )
                        : null
                    }
                </XStack>
            </YStack>
        </Layout>
    );
}
