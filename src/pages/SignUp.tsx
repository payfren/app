import {Form, FormTrigger, H2, Image, Paragraph, Spacer, YStack} from "tamagui";
import Layout from "../components/Layout";
import ExtendedInput from "../components/ExtendedInput";
import TelephoneInput from "../components/TelephoneInput";
import MainButton from "../components/MainButton";
import {Appearance} from "react-native";
import {useSignUpStore} from '../clientStore/SignUpStore';
import supabase from "../lib/Supabase";

export default function SignUpPage() {
    const lightLogo = require("../../assets/logoLight.png");
    const darkLogo = require("../../assets/logoDark.png");
    let logoPath = Appearance.getColorScheme() === "dark" ? lightLogo : darkLogo;

    const phoneNum = useSignUpStore((state) => state.profile.phoneNum);

    const handleFormSubmit = () => {
        // This is a test to check if the Supabase client works
        console.log("Număr de telefon: ", phoneNum);
        supabase.auth.getSession().then((session) => {
            console.log("Session: ", session);
        });
    }

    return (
        <Layout>
            <YStack justifyContent={"flex-start"} flex={1}>
                <Spacer size={"$5"}/>
                <Image source={logoPath} maxHeight={60} maxWidth={60} resizeMode={"contain"}/>
                <Spacer size={"$2"}/>
                <H2>Creează un cont</H2>
                <Paragraph>Completează cu atenție datele cerute</Paragraph>
                <Spacer size={"$4"}/>
                <Form flex={1} justifyContent={"space-between"} flexDirection={"column"}
                      onSubmit={handleFormSubmit}>
                    <YStack flex={1} flexDirection={"column"}>
                        <ExtendedInput label={"Prenumele tău"} placeholder={"Matei"} maxLength={30}
                                       cursorColor={"orange"}/>
                        <Spacer size={"$2"}/>
                        <ExtendedInput label={"Numele tău"} placeholder={"Popescu"} maxLength={30}
                                       cursorColor={"orange"}/>
                        <Spacer size={"$2"}/>
                        <TelephoneInput/>
                    </YStack>
                    <FormTrigger asChild>
                        <MainButton text={"Înregistrare"}/>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
