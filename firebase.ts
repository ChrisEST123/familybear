// Import core Firebase initialization and database modules
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase project configuration object
// These credentials are specific to your Firebase project and are used
// to connect the app to the correct backend services
const firebaseConfig = {
    apiKey: 'AIzaSyCYFHx-Sq1v4dl9Ncqa4Hnq6IoaUL7IdDM', // Public API key for Firebase
    authDomain: 'familybear-ab556.firebaseapp.com', // Auth domain for Firebase Authentication
    databaseURL:
        'https://familybear-ab556-default-rtdb.europe-west1.firebasedatabase.app', // Realtime Database URL
    projectId: 'familybear-ab556', // Unique Firebase project ID
    storageBucket: 'familybear-ab556.appspot.com', // Cloud Storage bucket
    messagingSenderId: '497997549865', // Sender ID for push messaging
    appId: '1:497997549865:web:7a62096b5ec2fadfad6738', // Unique app ID
};

// Initialize the Firebase app instance with the provided config
const app = initializeApp(firebaseConfig);

// Export the Realtime Database instance for use throughout the app
export const db = getDatabase(app);
