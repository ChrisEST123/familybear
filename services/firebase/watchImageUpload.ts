import * as FileSystem from 'expo-file-system';
import { set, ref as dbRef, get } from 'firebase/database';

import { db } from '@/firebase';

export const uploadWatchNotificationImage = async (
    localUri: string
): Promise<string> => {
    const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    const dataUri = `data:image/jpeg;base64,${base64}`;

    await set(dbRef(db, '/watch/imagefile'), {
        dataUri,
        timestamp: Date.now(),
    });

    return dataUri;
};

export const loadWatchNotificationImage = async (): Promise<string | null> => {
    const snapshot = await get(dbRef(db, '/watch/imagefile'));

    if (!snapshot.exists()) return null;

    return snapshot.val().dataUri || null;
};
