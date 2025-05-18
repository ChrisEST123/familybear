import * as FileSystem from 'expo-file-system';
import { set, ref as dbRef, get } from 'firebase/database';

import { db } from '@/firebase';

/**
 * Uploads a local image file (e.g., from a watch capture) to Firebase Realtime Database.
 * The image is encoded as a base64 data URI and stored under `/watch/imagefile`.
 *
 * @param localUri - Local file URI of the image to upload
 * @returns The base64 data URI of the uploaded image
 */
export const uploadWatchNotificationImage = async (
    localUri: string
): Promise<string> => {
    // Read the image file and encode it as a base64 string
    const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    // Prefix the base64 data to form a data URI (JPEG format)
    const dataUri = `data:image/jpeg;base64,${base64}`;

    // Store the data URI and a timestamp in Firebase
    await set(dbRef(db, '/watch/imagefile'), {
        dataUri,
        timestamp: Date.now(),
    });

    return dataUri;
};

/**
 * Loads the most recently uploaded watch image from Firebase.
 *
 * @returns The base64 data URI of the image, or null if none is found
 */
export const loadWatchNotificationImage = async (): Promise<string | null> => {
    const snapshot = await get(dbRef(db, '/watch/imagefile'));

    if (!snapshot.exists()) return null;

    // Return the base64 image string, or null if missing
    return snapshot.val().dataUri || null;
};
