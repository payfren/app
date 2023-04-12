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
                <Image source={logoPath} maxHeight={60} maxWidth={60} resizeMode={"contain"}/>
                <Spacer size={"$2"}/>
                <H2>Creează un cont</H2>
                <Paragraph>Completează cu atenție datele cerute</Paragraph>
                <Spacer size={"$4"}/>
                <Form onSubmit={() => console.log("Test")}>
                    <ExtendedInput label={"Prenumele tău"} placeholder={"Matei"}/>
                    <Spacer size={"$4"}/>
                    <ExtendedInput label={"Numele tău"} placeholder={"Popescu"}/>
                    <Spacer size={"$4"}/>
                    <TelephoneInput/>
                    <Spacer size={"$7"}/>
                    <FormTrigger asChild>
                        {/*TODO: This button does not trigger the form submit*/}
                        <MainButton text={"Înregistrare"} flexSize={null}/>
                    </FormTrigger>
                </Form>
            </YStack>
        </Layout>
    );
}
