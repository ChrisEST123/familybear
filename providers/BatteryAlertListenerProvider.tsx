import * as Notifications from 'expo-notifications';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useRef, ReactNode } from 'react';

import { db } from '@/firebase';

interface Props {
    children: ReactNode;
}

/**
 * Listens for low battery events from the bear and triggers a notification
 * if the battery drops below a defined threshold and alerts are enabled.
 */
export const BatteryAlertListenerProvider: React.FC<Props> = ({ children }) => {
    const triggeredRef = useRef(false); // Prevents repeat notifications until battery is recharged
    const notificationsEnabledRef = useRef(false); // Tracks user setting
    const THRESHOLD = 20; // Battery percentage threshold for alerts

    useEffect(() => {
        const batteryRef = ref(db, '/status/bear/battery'); // Path to battery level
        const settingRef = ref(db, '/status/app/notifications/lowBattery'); // Path to user setting

        // Listen for changes to the low battery notification setting
        const unsubscribeSetting = onValue(settingRef, (snapshot) => {
            notificationsEnabledRef.current = !!snapshot.val();
            console.log(
                'Notification setting updated:',
                notificationsEnabledRef.current
            );
        });

        // Listen for battery level changes
        const unsubscribeBattery = onValue(batteryRef, async (snapshot) => {
            const battery = snapshot.val();
            if (typeof battery !== 'number') return;

            // Trigger notification only if under threshold, notifications enabled, and not already triggered
            if (
                battery < THRESHOLD &&
                !triggeredRef.current &&
                notificationsEnabledRef.current
            ) {
                triggeredRef.current = true;

                try {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Low Battery Warning',
                            body: `The bear's battery is low (${battery}%). Please recharge it soon.`,
                            sound: 'default',
                        },
                        trigger: null, // Send immediately
                    });
                    console.log('Notification sent');
                } catch (err) {
                    console.error('Failed to schedule notification:', err);
                }
            }

            // Reset trigger if battery rises above the threshold
            if (battery >= THRESHOLD) {
                triggeredRef.current = false;
            }
        });

        // Clean up listeners on unmount
        return () => {
            unsubscribeSetting();
            unsubscribeBattery();
        };
    }, []);

    // This provider wraps children but provides no visible context; it just sets up listeners
    return <>{children}</>;
};
