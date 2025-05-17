import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { BatteryAlertListenerProvider } from '@/providers/BatteryAlertListenerProvider';
import { BearPickupListenerProvider } from '@/providers/BearPickupListenerProvider';
import { GeoFenceAlertListenerProvider } from '@/providers/GeoFenceAlertListenerProvider';

export default function Layout() {
    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true,
                shouldShowList: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('bear-alerts', {
                name: 'Bear Alerts',
                importance: Notifications.AndroidImportance.HIGH,
                sound: 'default',
            });
        }
    }, []);

    return (
        <BearPickupListenerProvider>
            <GeoFenceAlertListenerProvider>
                <BatteryAlertListenerProvider>
                    <Stack
                        screenOptions={{
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontWeight: '600',
                                fontSize: 18,
                            },
                        }}
                    >
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                    </Stack>
                </BatteryAlertListenerProvider>
            </GeoFenceAlertListenerProvider>
        </BearPickupListenerProvider>
    );
}
