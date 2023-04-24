import supabase from "../lib/supabase";

export default async function createNewUser(email: string, password: string) {
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.log(error);
        return error;
    }

    console.log(data.user.email);
}
