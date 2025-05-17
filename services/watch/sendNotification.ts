import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
