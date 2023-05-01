import {Button, Spinner} from "tamagui";
import supabase from "../lib/supabase.ts";
import * as Linking from 'expo-linking';
import {useState} from "react";

export default function AddBankButton({bankName, bankId}) {
    const [loading, setLoading] = useState(false);
    const generateConsentLink = async () => {
        const {data, error} = await supabase.functions.invoke('get_psd2_consent_link', {
            body: {
                institution_id: bankId,
            }
        })
        if (error) {
            console.log(error);
            return null;
        }
        return data['link'];
    }

    const handleRedirect = async () => {
        setLoading(true);
        const consentLink = await generateConsentLink();
        console.log(consentLink);
        await Linking.openURL(consentLink).then(() => {
            setLoading(false);
        });
    }

    return (
        <Button onPress={handleRedirect} disabled={loading} icon={loading === true && <Spinner color={"$color"}/>}>
            {bankName}
        </Button>
    );
}
