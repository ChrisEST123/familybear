import notifee, { AndroidImportance } from '@notifee/react-native';

export const setupNotifications = async () => {
    await notifee.createChannel({
        id: 'bear-alerts',
        name: 'Bear Alerts',
        importance: AndroidImportance.HIGH,
    });
};
