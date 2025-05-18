import * as Notifications from 'expo-notifications';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, ReactNode, useRef } from 'react';

import { db } from '@/firebase';
import { subscribeToFsrStatus } from '@/services/firebase/subscribers';

interface Props {
    children: ReactNode;
}

/**
 * Listens for bear pickup events (via FSR sensor)
 * and sends an in-app notification if notifications are enabled.
 */
export const BearPickupListenerProvider: React.FC<Props> = ({ children }) => {
    const triggeredRef = useRef(false); // Prevents repeated notifications
    const enabledRef = useRef(false); // Tracks if user has enabled this notification

    // Request notification permissions on mount
    useEffect(() => {
        const requestPermission = async () => {
            const settings = await Notifications.getPermissionsAsync();
            if (!settings.granted) {
                const response = await Notifications.requestPermissionsAsync();
                console.log('Requested notification permission:', response);
            }
        };

        requestPermission();
    }, []);

    // Listen to user preference for pickup notifications from Firebase
    useEffect(() => {
        const settingRef = ref(db, '/status/app/notifications/bearPickup');

        const unsubscribe = onValue(settingRef, (snapshot) => {
            enabledRef.current = !!snapshot.val();
            console.log('Notification setting updated:', enabledRef.current);
        });

        return () => unsubscribe();
    }, []);

    // Subscribe to FSR (pickup sensor) status
    useEffect(() => {
        const unsubscribe = subscribeToFsrStatus(async (value) => {
            // Trigger notification only once per pickup while notifications are enabled
            if (value && !triggeredRef.current && enabledRef.current) {
                triggeredRef.current = true;

                try {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Your child is thinking of you',
                            body: 'The bear was picked up!',
                            sound: 'default',
                        },
                        trigger: null, // Fire immediately
                    });
                    console.log('Notification scheduled');
                } catch (err) {
                    console.error('Failed to schedule notification:', err);
                }
            }

            // Reset trigger when bear is released
            if (!value) {
                triggeredRef.current = false;
            }
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    return <>{children}</>; // Acts as a wrapper with side effects only
};
