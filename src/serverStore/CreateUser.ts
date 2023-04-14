import Supabase from "./SupabaseClient";

export default async function CreateUser(email: string, password: string) {
    const { data , error } = await Supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.log(error);
        return error;
    }

    console.log(data.user.email);
}
