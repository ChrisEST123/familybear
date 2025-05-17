import * as Notifications from 'expo-notifications';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useRef, ReactNode } from 'react';

import { db } from '@/firebase';

interface Props {
    children: ReactNode;
}

export const BatteryAlertListenerProvider: React.FC<Props> = ({ children }) => {
    const triggeredRef = useRef(false);
    const THRESHOLD = 20;

    useEffect(() => {
        const batteryRef = ref(db, '/status/bear/battery');

        const unsubscribe = onValue(batteryRef, (snapshot) => {
            const battery = snapshot.val();
            if (typeof battery !== 'number') return;

            if (battery < THRESHOLD && !triggeredRef.current) {
                triggeredRef.current = true;

                Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Low Battery Warning',
                        body: `The bear's battery is low (${battery}%). Please recharge it soon.`,
                        sound: 'default',
                    },
                    trigger: null,
                });
            }

            if (battery >= THRESHOLD) {
                triggeredRef.current = false;
            }
        });

        return unsubscribe;
    }, []);

    return <>{children}</>;
};
