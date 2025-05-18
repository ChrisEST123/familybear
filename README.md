🧸 FamilyBear Companion App
===========================

**FamilyBear** is a mobile app that helps parents stay emotionally connected to their children through a tactile teddy bear. The app allows sending heartbeats, sounds, and scheduled wake-up modes remotely. It is built using **React Native (Expo)** and connects to a **Firebase Realtime Database**.

* * *

🚀 Features
-----------

*   Send preset or custom **heartbeat vibrations**
*   Control **wake-up mode scheduling**
*   Select and trigger **sound patterns**
*   Live **vibration status updates**
*   Firebase integration with real-time sync

* * *

📲 Getting Started
------------------

### 1\. Clone the Repository

    
    git clone https://github.com/your-org/familybear-app.git
    cd familybear-app
    

### 2\. Install Dependencies

    
    npm install
    # or
    yarn
    

### 3\. Create a .env File

Create a file named `.env` in the root directory with the following values:

    
    FIREBASE_API_KEY=your_api_key
    FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
    FIREBASE_PROJECT_ID=your_project
    FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    FIREBASE_APP_ID=your_app_id
    

**Note:** You do not need to configure Firebase manually — the app handles it via `firebase.ts`.

### 4\. Start the App

    
    npx expo start
    

Since this project will be ejected, **you must use a custom development build**. Expo Go is not supported.

#### Build a Development Client

    
    npx expo run:android
    # or
    npx expo run:ios
    
Keep in mind IOS has not been the main focus of development.

This will install the native dev client and launch the app directly on your device or emulator.

### 6\. Build APK for Distribution

    npx expo run:android --variant release

APK output location:

    android/app/build/outputs/apk/release/app-release.apk

* * *

📱 Running on Android Emulator
------------------------------

### 1\. Install Android Studio

Download and install from [developer.android.com/studio](https://developer.android.com/studio).

### 2\. Set Up the Emulator

*   Launch Android Studio
*   Go to **Device Manager** → Create Device
*   Choose a device (e.g. Pixel 6) and system image (e.g. API 33+)
*   Finish setup and start the emulator

### 3\. Run the App on Emulator

With the emulator running:

    
    npx expo run:android
    

This will compile and install the app onto the emulator.

* * *

Troubleshooting
---------------

### App launches with outdated or incorrect code

*   Run `npx expo start --clear` to clear the Metro cache
*   Ensure changes are saved before building
*   Ensure correct `.env` is present with no typos

### Firebase does not connect

*   Check for internet access on emulator or device
*   Double-check all keys in `.env`
*   Ensure Firebase Realtime Database is enabled
*   If on android make sure `google-services.json` has been added to ./android/app

### Notifications are not received

*   Expo Go does not support push/local notifications in SDK 53+
*   Use `expo run:android` to install the Dev Client
*   Ensure the user grants notification permission
*   Do not send large image payloads as it may cause scheduling failures

### Kotlin or Gradle build fails (e.g., BuildConfig not found)

    cd android
    ./gradlew clean
    cd ..
    npx expo run:android
    

### Emulator cannot access Firebase Emulator on localhost

    adb reverse tcp:9000 tcp:9000

This forwards traffic to your local Firebase emulator environment.

### Firebase Storage upload fails

*   This app does not use Firebase Storage for watch images
*   Base64 image strings are stored directly in Realtime Database
*   Large files may exceed Realtime Database limits, keep them small
