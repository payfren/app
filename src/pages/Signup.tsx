import {Form, FormTrigger, H2, Paragraph, Spacer, YStack, Spinner} from "tamagui";
import Layout from "../components/Layout";
import ExtendedInput from "../components/ExtendedInput";
import MainButton from "../components/MainButton";
import {useSignUpStore} from '../clientStore/SignUpStore';
import {useRouter} from "expo-router";
import PhoneNumberInput from "../components/PhoneNumberInput";
import Logo from "../components/Logo";
import createNewUser from "../lib/createNewUser";
import {useState} from "react";

export default function Signup() {
    const {
        getPhoneNumber,
        setPhoneNumber,
        getGivenName,
        setGivenName,
        getFamilyName,
        setFamilyName,
    } = useSignUpStore((state) => ({
        getPhoneNumber: state.getPhoneNumber,
        setPhoneNumber: state.setPhoneNumber,
        getGivenName: state.getGivenName,
        setGivenName: state.setGivenName,
        getFamilyName: state.getFamilyName,
        setFamilyName: state.setFamilyName,
    }));
    const router = useRouter();
    const [status, setStatus] = useState<'off' | 'processing'>('off')

    const handleFormSubmit = async () => {
        setStatus('processing');
        const phoneNumber = getPhoneNumber();
        const givenName = getGivenName();
        const familyName = getFamilyName();
        if (!phoneNumber || phoneNumber.length !== 15) {
            console.log("Invalid phone number!");
            setStatus('off');
            return;
        }
        if (!givenName || givenName.length < 3) {
            console.log("Invalid given name!");
            setStatus('off');
            return;
        }
        if (!familyName || familyName.length < 3) {
            console.log("Invalid family name!");
            setStatus('off');
            return;
        }
        // If everything is valid, create a new user
        try {
            const response = await createNewUser(phoneNumber, givenName, familyName);
            if (response) {
                router.push({pathname: "/verify-otp", params: {from: "signup"}});
            } else {
                console.log("Failed to create user!");
            }
        }
        finally {
            setStatus('off');
        }
    };


    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <Spacer size={"$5"}/>
                <Logo/>
                <Spacer size={"$2"}/>
                <H2>Creează un cont</H2>
                <Paragraph>Completează cu atenție datele cerute</Paragraph>
                <Spacer size={"$4"}/>
                <Form flex={1} justifyContent={"space-between"} flexDirection={"column"}
                      onSubmit={handleFormSubmit}>
                    <YStack flex={1} flexDirection={"column"}>
                        <ExtendedInput label={"Prenumele tău"} getValue={getGivenName} setValue={setGivenName}
                                       placeholder={"Matei"} maxLength={30}
                                       cursorColor={"orange"}/>
                        <Spacer size={"$2"}/>
                        <ExtendedInput label={"Numele tău"} getValue={getFamilyName} setValue={setFamilyName}
                                       placeholder={"Popescu"} maxLength={30}
                                       cursorColor={"orange"}/>
                        <Spacer size={"$2"}/>
                        <PhoneNumberInput getPhoneNumber={getPhoneNumber} setPhoneNumber={setPhoneNumber}/>
                    </YStack>
                    <FormTrigger asChild disabled={status !== 'off'}>
                        <MainButton icon={status === 'processing' && <Spinner color={"$color"}/>}
                                    text={"Înregistrare"}/>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
