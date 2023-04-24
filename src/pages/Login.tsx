import {useColorScheme} from "react-native";
import {useMemo} from "react";
import Layout from "../components/Layout";
import {Form, FormTrigger, H2, Image, Paragraph, Spacer, YStack} from "tamagui";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {Link} from "expo-router";
import MainButton from "../components/MainButton";
import {useSignInStore} from "../clientStore/SignInStore";

export default function Login() {
    const lightLogo = require("../../assets/logoLight.png");
    const darkLogo = require("../../assets/logoDark.png");
    const colorScheme = useColorScheme();
    const logoPath = useMemo(() => {
        return colorScheme === "dark" ? lightLogo : darkLogo;
    }, [colorScheme]);
    const getPhoneNumber = useSignInStore(state => state.getPhoneNumber);
    const setPhoneNumber = useSignInStore(state => state.setPhoneNumber);

    const handleFormSubmit = () => {
        console.log("Număr de telefon: ", getPhoneNumber());
    }

    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <Spacer size={"$5"}/>
                <Image source={logoPath} maxHeight={60} maxWidth={60} resizeMode={"contain"}/>
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
                        <Link href={{pathname:"/verify-otp", params:{from:"login"}}} asChild>
                            <MainButton text={"Conectare"}/>
                        </Link>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
