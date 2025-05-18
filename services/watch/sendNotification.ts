import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import { get, ref, update } from 'firebase/database';
import { Platform } from 'react-native';

import { db } from '@/firebase';

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

    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body: message,
            sound: 'default',
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
        trigger: null,
    });
};

interface NotificationPrefs {
    bearPickup?: boolean;
    geoFenceBreach?: boolean;
    lowBattery?: boolean;
}

export const fetchNotificationSettings =
    async (): Promise<NotificationPrefs> => {
        const snap = await get(ref(db, '/status/app/notifications'));
        return snap.exists() ? snap.val() : {};
    };

export const setNotificationSetting = async (
    key: keyof NotificationPrefs,
    value: boolean
) => {
    return update(ref(db, '/status/app/notifications'), { [key]: value });
};
