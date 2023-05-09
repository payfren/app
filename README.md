# Payfren Mobile App

The mobile app that makes banking easier for you, built using Expo, React Native, and Tamagui components.
Download the Android version now: https://expo.dev/accounts/payfren/projects/app/builds/408e0698-0471-4132-846a-06958ec234cf

## Getting Started

- Clone this repository
- Run `yarn install` to install dependencies
- Run `yarn start` to install the development client and run the app
- Run `yarn build` to build the app for production (Android and iOS)
  - On every build, create a .env file in the root directory with the following contents:
    ```env
    SUPABASE_URL=<supabase_url>
    SUPABASE_ANON_KEY=<supabase_anon_key>
    ```
    Replace `<supabase_url>` and `<supabase_anon_key>` with your Supabase URL and key respectively.
  - After build, delete it in order to not be committed to the repository. We do this because if we ignore the file, it will not be seen by the EAS build process.
## Dependencies

- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)
- [Tamagui](https://tamagui.dev/) -> UI components and color scheme
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) -> State management
- [React Query](https://react-query.tanstack.com/) -> Data fetching and caching
- [Supabase](https://supabase.com/) -> Database and authentication

## Bugs and Issues

- On Android, opening the keyboard may resize the screen. This is a known issue with Expo and React Native. To fix this, add the
  following to your `app.json` file in "android" object:
    ```json
        "softwareKeyboardLayoutMode": "pan"
    ```
  This will not allow the keyboard to resize the screen, but it will allow the keyboard to go over the screen.
- Implement EAS Secrets for Supabase URL and key, to avoid having to create a .env file on every build.
