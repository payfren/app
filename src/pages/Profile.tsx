import {Avatar, H2, Input, Label, Paragraph, Spacer, XStack, YStack} from "tamagui";
import supabase from "../lib/supabase";
import React, {useCallback} from "react";
import Layout from "../components/Layout";
import AppLoading from "./AppLoading";
import Logo from "../components/Logo";
import MainButton from "../components/MainButton";
import * as ImagePicker from 'expo-image-picker';
import useUserProfile from "../serverStore/getUserProfile";
import {decode} from 'base64-arraybuffer';

export default function Profile() {
    const {data: user, isLoading, refetch} = useUserProfile();

    const pickImage = useCallback(async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });
        if (!result.canceled) {
            // Delete the user's previous profile photo from Supabase storage bucket
            if (result.assets[0].type.toString() !== 'image') {
                console.error('Error uploading image: Invalid file type');
                return;
            }
            const {error: previousPhotoError} = await supabase.storage
                .from('profile_photos')
                .remove([`public/${user.user_id}/profile-photo`]);
            if (previousPhotoError) {
                console.error('Error removing previous profile photo:', previousPhotoError);
            }
            // Upload the selected image to Supabase storage bucket
            const base64Image = result.assets[0].base64;
            const uploadPath = `public/${user.user_id}/profile-photo`;
            const imageType = result.assets[0].uri.split('.').pop();
            const {error} = await supabase
                .storage
                .from('profile_photos')
                .upload(uploadPath, decode(base64Image), {
                    contentType: result.assets[0].type + '/' + imageType,
                });
            if (error) {
                console.error('Error uploading image:', error);
            }
            // Retrieve the uploaded image's URL
            const {data: publicURL} = supabase.storage.from('profile_photos').getPublicUrl(uploadPath);
            const photoURL = publicURL.publicUrl;
            // Update the user's profile photo URL in the database
            const {error: updateError} = await supabase
                .from('profiles')
                .update({profile_photo: photoURL})
                .eq('user_id', user.user_id)
            if (updateError) {
                console.error('Error updating profile photo:', updateError);
            }
            refetch();
        }
    }, []);

    if (isLoading) {
        return (
            <AppLoading/>
        );
    }

    return (
        <Layout>
            <YStack justifyContent={"space-evenly"} flex={1}>
                <YStack flex={1}>
                    <Spacer size={"$5"}/>
                    <Logo/>
                    <Spacer size={"$2"}/>
                    <H2>Profilul tău</H2>
                    <Paragraph>Informații despre contul tău</Paragraph>
                    <Spacer size={"$5"}/>
                    <XStack justifyContent={"center"}>
                        <Avatar circular size="$10" onPress={pickImage}>
                            <Avatar.Image
                                source={{uri: user.profile_photo}}/>
                            <Avatar.Fallback bc="$gray5"/>
                        </Avatar>
                    </XStack>
                    <Spacer size={"$1"}/>
                    <Paragraph textAlign={"center"} color={"gray"}>Apasă pentru a modifica poza</Paragraph>
                    <Spacer size={"$5"}/>
                    <XStack alignItems="center" space="$4">
                        <Label width={90} htmlFor="given_name">
                            Prenume
                        </Label>
                        <Input flex={1} id="given_name_input" value={user.given_name} editable={false}/>
                    </XStack>
                    <Spacer/>
                    <XStack alignItems="center" space="$4">
                        <Label width={90} htmlFor="family_name">
                            Nume
                        </Label>
                        <Input flex={1} id="family_name_input" value={user.family_name} editable={false}/>
                    </XStack>
                    <Spacer/>
                    <XStack alignItems="center" space="$4">
                        <Label width={90} htmlFor="phone_number">
                            Telefon
                        </Label>
                        <Input flex={1} id="phone_number_input" value={user.phone_number} editable={false}/>
                    </XStack>
                    <Spacer/>
                </YStack>
                <MainButton onPress={() => supabase.auth.signOut()} text={"Deconectare"}></MainButton>
            </YStack>
        </Layout>
    );
}
