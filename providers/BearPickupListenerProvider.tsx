import * as Notifications from 'expo-notifications';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, ReactNode, useRef } from 'react';

import { db } from '@/firebase';
import { subscribeToFsrStatus } from '@/services/firebase/subscribers';

interface Props {
    children: ReactNode;
}

export const BearPickupListenerProvider: React.FC<Props> = ({ children }) => {
    const triggeredRef = useRef(false);
    const enabledRef = useRef(false);

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

    useEffect(() => {
        const settingRef = ref(db, '/status/app/notifications/bearPickup');

        const unsubscribe = onValue(settingRef, (snapshot) => {
            enabledRef.current = !!snapshot.val();
            console.log('Notification setting updated:', enabledRef.current);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToFsrStatus(async (value) => {
            if (value && !triggeredRef.current && enabledRef.current) {
                triggeredRef.current = true;

                try {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Your child is thinking of you',
                            body: 'The bear was picked up!',
                            sound: 'default',
                        },
                        trigger: null,
                    });
                    console.log('Notification scheduled');
                } catch (err) {
                    console.error('Failed to schedule notification:', err);
                }
            }

            if (!value) {
                triggeredRef.current = false;
            }
        });

        return () => unsubscribe();
    }, []);

    return <>{children}</>;
};
