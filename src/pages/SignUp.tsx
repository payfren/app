import {Form, FormTrigger, H2, Image, Paragraph, Spacer, YStack} from "tamagui";
import Layout from "../components/Layout";
import ExtendedInput from "../components/ExtendedInput";
import TelephoneInput from "../components/TelephoneInput";
import MainButton from "../components/MainButton";
import {Appearance} from "react-native";

export default function SignUpPage() {
    const lightLogo = require("../../assets/logoLight.png");
    const darkLogo = require("../../assets/logoDark.png");
    let logoPath = Appearance.getColorScheme() === "dark" ? lightLogo : darkLogo;

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
                      onSubmit={() => console.log("Creare utilizator...")}>
                    <YStack flex={1} flexDirection={"column"}>
                        <ExtendedInput label={"Prenumele tău"} placeholder={"Matei"}/>
                        <Spacer size={"$2"}/>
                        <ExtendedInput label={"Numele tău"} placeholder={"Popescu"}/>
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
