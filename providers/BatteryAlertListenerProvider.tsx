import * as Notifications from 'expo-notifications';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useRef, ReactNode } from 'react';

import { db } from '@/firebase';

interface Props {
    children: ReactNode;
}

export const BatteryAlertListenerProvider: React.FC<Props> = ({ children }) => {
    const triggeredRef = useRef(false);
    const notificationsEnabledRef = useRef(false);
    const THRESHOLD = 20;

    useEffect(() => {
        const batteryRef = ref(db, '/status/bear/battery');
        const settingRef = ref(db, '/status/app/notifications/lowBattery');

        const unsubscribeSetting = onValue(settingRef, (snapshot) => {
            notificationsEnabledRef.current = !!snapshot.val();
            console.log(
                'Notification setting updated:',
                notificationsEnabledRef.current
            );
        });

        const unsubscribeBattery = onValue(batteryRef, async (snapshot) => {
            const battery = snapshot.val();
            if (typeof battery !== 'number') return;

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
                        trigger: null,
                    });
                    console.log('Notification sent');
                } catch (err) {
                    console.error('Failed to schedule notification:', err);
                }
            }

            if (battery >= THRESHOLD) {
                triggeredRef.current = false;
            }
        });

        return () => {
            unsubscribeSetting();
            unsubscribeBattery();
        };
    }, []);

    return <>{children}</>;
};
