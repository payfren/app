# Payfren Mobile App

The mobile app that makes banking easier for you, built using Expo, React Native, and Tamagui components.

## Getting Started

- Clone this repository
- Run `yarn install` to install dependencies
- Run `yarn start` to install the development client and run the app
- Run `yarn build` to build the app for production (Android and iOS)

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
