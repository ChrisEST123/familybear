// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCYFHx-Sq1v4dl9Ncqa4Hnq6IoaUL7IdDM',
    authDomain: 'familybear-ab556.firebaseapp.com',
    databaseURL:
        'https://familybear-ab556-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'familybear-ab556',
    storageBucket: 'familybear-ab556.appspot.com',
    messagingSenderId: '497997549865',
    appId: '1:497997549865:web:7a62096b5ec2fadfad6738',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
