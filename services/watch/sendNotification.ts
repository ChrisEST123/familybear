import { Alert } from 'react-native';

interface NotificationPayload {
    title: string;
    message: string;
    imageUrl?: string;
}

export const sendWatchNotification = async ({
    title,
    message,
    imageUrl,
}: NotificationPayload) => {
    Alert.alert(title, imageUrl ? `${message}\n\n[Image attached]` : message);
};
