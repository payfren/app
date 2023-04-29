import {Button} from "tamagui";

export default function AddBankButton({bankName, bankId}) {
    return (
        <Button>
            {bankName}
        </Button>
    );
}
