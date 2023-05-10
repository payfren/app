# Payfren by _Team Reactoor_

The mobile app that makes banking easier for you, built using Expo, React Native, and Tamagui components.

## Informații importante pentru jurizare (în română)
* Numele echipei: Reactoor
* Școala de proveniență: Colegiul Național de Informatică „Tudor Vianu” București
* Link video pitch: TBP
* Link video demo: TBP

## Getting Started

- Clone this repository
- Run `yarn install` to install dependencies
- Run `yarn run start:development` to install the development client and run the app
- Run `yarn run build:android` to build the app for production (only Android for now, no Macbook to test this on IOS :/)
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
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) -> Client state management
- [React Query](https://react-query.tanstack.com/) -> Server data fetching and caching
- [Supabase](https://supabase.com/) -> Database and authentication (Backend as a Service)

## Bugs and Issues

- On Android, opening the keyboard may resize the screen. This is a known issue with Expo and React Native. To fix this, add the
  following to your `app.json` file in "android" object:
    ```json
        "softwareKeyboardLayoutMode": "pan"
    ```
  This will not allow the keyboard to resize the screen, but it will allow the keyboard to go over the screen. For IOS, this is the default behavior.
- Implement EAS Secrets for Supabase URL and key, to avoid having to create a .env file on every build.
- When opening in offline mode, there will be a short render of "/" route even if you are logged in, because the app needs to fetch user data from backend. This is a known bug that affects UX a bit, but it is not a big issue. It will still get fixed in an upcoming version.
