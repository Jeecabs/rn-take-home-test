## Getting Started with Expo React Native App (Dev Client)
This README provides a step-by-step guide to setting up and running an Expo React Native app using the Expo Dev Client.

### Prerequisites
Before you start, please ensure that you have the following installed on your machine:

- Node.js - Install the LTS version (recommended) or the latest version.
- Expo CLI - Install the Expo CLI globally by running `npm install -g expo-cli`.
- Xcode - Install Xcode to run the app on an iOS simulator (macOS only). You may also use Android Studio to run the app on an Android emulator.

### Setting Up the Project
1. Clone the repository to your local machine using `git clone <repository-url>`.
2. Navigate to the project directory using `cd <project-directory>`.
3. Install the project dependencies by running `npm install` or `yarn install` (if you have Yarn installed).

### Running the App
To run the Expo React Native app using the Expo Dev Client, follow these steps:

1. Start the development server by running `npx expo start --dev-client`. This start the process 
2. To run the app on an iOS simulator (macOS only), press `i` in the terminal window. This will open the app in the iOS simulator. If you don't have the required simulator installed, Xcode will prompt you to download and install it.
3. To run the app on an Android emulator, press `a` in the terminal window. This will open the app in the Android emulator. Make sure you have the emulator running before pressing `a`.

### Running the App on a Physical Device
To run the app on a physical device, follow these steps:

1. Install the Expo Go app on your iOS or Android device.
2. Ensure that your device and development machine are on the same network.
3. Open the Expo Go app on your device and scan the QR code displayed in the Expo Dev Tools in your browser or terminal window.
4. The app should now load on your device. As you make changes to the app's code, the app will automatically reload to display the latest changes.

### Troubleshooting
If you encounter any issues while running the app, try the following:

- Ensure that you have the latest version of Expo CLI installed.
- Delete the `node_modules` folder and reinstall the dependencies by running `npm install` or `yarn install`.
- Reset the cache by running `npx expo start --dev-client --clear`.

For more information, refer to the [Expo documentation](https://docs.expo.io/).
