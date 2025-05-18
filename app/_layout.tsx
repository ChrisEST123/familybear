import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

// Context providers that listen to specific alert events
import { BatteryAlertListenerProvider } from '@/providers/BatteryAlertListenerProvider';
import { BearPickupListenerProvider } from '@/providers/BearPickupListenerProvider';
import { GeoFenceAlertListenerProvider } from '@/providers/GeoFenceAlertListenerProvider';

export default function Layout() {
    useEffect(() => {
        // Configure how notifications are handled when received in the foreground
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true, // Show notification as a banner
                shouldShowList: true, // Display in notification center
                shouldPlaySound: true, // Play sound with the notification
                shouldSetBadge: false, // Do not update app icon badge
            }),
        });

        // For Android: set up a dedicated notification channel with high importance
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('bear-alerts', {
                name: 'Bear Alerts', // Display name in system settings
                importance: Notifications.AndroidImportance.HIGH, // Ensures alert visibility
                sound: 'default', // Use system default notification sound
            });
        }
    }, []);

    return (
        // Wrap the app in alert listener providers, allowing app-wide access to notification triggers
        <BearPickupListenerProvider>
            <GeoFenceAlertListenerProvider>
                <BatteryAlertListenerProvider>
                    {/* Configure stack navigation with centralized header styles */}
                    <Stack
                        screenOptions={{
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontWeight: '600',
                                fontSize: 18,
                            },
                        }}
                    >
                        {/* Main tab-based layout; header hidden at this level */}
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
