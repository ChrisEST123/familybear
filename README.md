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

🧪 Local Testing
----------------

### Test Live Features

*   Use the heartbeat form to submit BPM and frequency
*   Pick a sound to send from Bear Settings
*   Toggle and schedule wake-up mode time
*   Watch status tiles update based on Firebase data

* * *

🔧 Troubleshooting
------------------

### ❌ Firebase Not Connecting

**Problem:** Firebase requests fail or silently time out.

**Fix:**

*   Ensure you have internet access on your emulator or device
*   Restart the emulator
*   Check your `.env` values
*   Ensure the correct Firebase Realtime Database URL is used

### ❌ Emulator Cannot Reach Firebase (on localhost)

If you're using a local Firebase emulator or tunneling, run:

    
    adb reverse tcp:9000 tcp:9000
    

This allows your Android emulator to access your machine's localhost ports.

### ❌ Firebase Storage Upload Fails

**Problem:** Storage uploads fail due to big file size.

**Fix:** I use base64 image data directly in Realtime Database which has some limitations.
