import {Button} from "tamagui";
import supabase from "../lib/supabase.ts";

export default function AddBankButton({bankName, bankId}) {
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
        const consentLink = await generateConsentLink();
        console.log(consentLink);
    }

    return (
        <Button onPress={handleRedirect}>
            {bankName}
        </Button>
    );
}
