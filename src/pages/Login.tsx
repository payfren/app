import Layout from "../components/Layout";
import {Form, FormTrigger, H2, Paragraph, Spacer, YStack} from "tamagui";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {Link} from "expo-router";
import MainButton from "../components/MainButton";
import {useSignInStore} from "../clientStore/SignInStore";
import Logo from "../components/Logo";


export default function Login() {
    const {getPhoneNumber, setPhoneNumber} = useSignInStore((state) => ({
        getPhoneNumber: state.getPhoneNumber,
        setPhoneNumber: state.setPhoneNumber,
    }));

    const handleFormSubmit = () => {
        console.log("Număr de telefon: ", getPhoneNumber());
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
                    <FormTrigger asChild>
                        <Link href={{pathname: "/verify-otp", params: {from: "login"}}} asChild>
                            <MainButton text={"Conectare"}/>
                        </Link>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
