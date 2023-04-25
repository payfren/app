import Layout from "../components/Layout";
import {Form, FormTrigger, H2, Paragraph, Spacer, Spinner, YStack} from "tamagui";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {useRouter} from "expo-router";
import MainButton from "../components/MainButton";
import {useSignInStore} from "../clientStore/SignInStore";
import Logo from "../components/Logo";
import {useState} from "react";
import authenticateUser from "../lib/authenticateUser";


export default function Login() {
    const {getPhoneNumber, setPhoneNumber} = useSignInStore((state) => ({
        getPhoneNumber: state.getPhoneNumber,
        setPhoneNumber: state.setPhoneNumber,
    }));
    const router = useRouter();
    const [status, setStatus] = useState<'off' | 'processing'>('off');

    const handleFormSubmit = async () => {
        setStatus('processing');
        const phoneNumber = getPhoneNumber();
        if (!phoneNumber || phoneNumber.length !== 15) {
            console.log("Invalid phone number!");
            setStatus('off');
            return;
        }
        try {
            const response = await authenticateUser(phoneNumber);
            if (response) {
                console.log("Sent OTP!");
                router.push({pathname: "/verify-otp", params: {from: "login"}});
            } else
                console.log("Failed to authenticate user!");
        } finally {
            setStatus('off');
        }
    };

    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <Spacer size={"$5"}/>
                <Logo/>
                <Spacer size={"$2"}/>
                <H2>Conectează-te</H2>
                <Paragraph>Autentifică-te pentru a intra în cont</Paragraph>
                <Spacer size={"$4"}/>
                <Form flex={1} justifyContent={"space-between"} flexDirection={"column"}
                      onSubmit={handleFormSubmit}>
                    <YStack flex={1} flexDirection={"column"}>
                        <PhoneNumberInput getPhoneNumber={getPhoneNumber} setPhoneNumber={setPhoneNumber}/>
                    </YStack>
                    <FormTrigger asChild disabled={status !== 'off'}>
                        <MainButton icon={status === 'processing' && <Spinner color={"$color"}/>} text={"Conectare"}/>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
