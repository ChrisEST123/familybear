import { NativeModules } from 'react-native';

const { WatchBridge } = NativeModules;

interface NotificationPayload {
    title: string;
    message: string;
    imageUri?: string;
}

export const sendWatchNotification = async ({
    title,
    message,
    imageUri,
}: NotificationPayload) => {
    if (!WatchBridge || typeof WatchBridge.sendToWatch !== 'function') {
        console.log(
            '[WatchBridge] No connected watch or native module. Skipping send.'
        );
        return;
    }

    try {
        await WatchBridge.sendToWatch(title, message, imageUri ?? null);
        console.log('[WatchBridge] Sent payload to watch.');
    } catch (error) {
        console.warn('[WatchBridge] Error sending to watch:', error);
    }
};
