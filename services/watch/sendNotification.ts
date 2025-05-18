import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import { get, ref, update } from 'firebase/database';
import { Platform } from 'react-native';

import { db } from '@/firebase';

/**
 * Sends a local in-app notification with optional image attachment (iOS only, not tested).
 *
 * @param title - Notification title
 * @param message - Notification message body
 * @param imageUri - Optional image URL to attach (only on iOS)
 */
export const sendInAppNotification = async ({
    title,
    message,
    imageUri,
}: {
    title: string;
    message: string;
    imageUri?: string;
}) => {
    let localImagePath: string | undefined;

    // On iOS, download the image locally so it can be used as an attachment
    if (imageUri && Platform.OS === 'ios') {
        try {
            const filename = imageUri.split('/').pop() ?? 'image.jpg';
            const path = `${FileSystem.cacheDirectory}${filename}`;
            const download = await FileSystem.downloadAsync(imageUri, path);
            localImagePath = download.uri;
        } catch (err) {
            console.warn('Failed to download image for notification:', err);
        }
    }

    // Schedule the local notification
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body: message,
            sound: 'default',
            // Attach the image if available (iOS only)
            ...(localImagePath && Platform.OS === 'ios'
                ? {
                      attachments: [
                          {
                              identifier: 'image',
                              url: localImagePath,
                              type: 'image/jpeg',
                          },
                      ],
                  }
                : {}),
        },
        trigger: null, // Immediate trigger
    });
};

// Type definition for notification preferences stored in Firebase
interface NotificationPrefs {
    bearPickup?: boolean;
    geoFenceBreach?: boolean;
    lowBattery?: boolean;
}

/**
 * Fetches current notification settings from Firebase.
 * @returns A record of enabled/disabled preferences
 */
export const fetchNotificationSettings =
    async (): Promise<NotificationPrefs> => {
        const snap = await get(ref(db, '/status/app/notifications'));
        return snap.exists() ? snap.val() : {};
    };

/**
 * Updates a single notification preference in Firebase.
 *
 * @param key - The specific notification type (e.g., 'bearPickup')
 * @param value - Whether the notification is enabled (true) or disabled (false)
 */
export const setNotificationSetting = async (
    key: keyof NotificationPrefs,
    value: boolean
) => {
    return update(ref(db, '/status/app/notifications'), { [key]: value });
};
