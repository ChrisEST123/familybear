import * as Notifications from 'expo-notifications';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useRef, ReactNode } from 'react';

import { db } from '@/firebase';

interface Props {
    children: ReactNode;
}

export const GeoFenceAlertListenerProvider: React.FC<Props> = ({
    children,
}) => {
    const triggeredRef = useRef(false);
    const enabledRef = useRef(false);

    useEffect(() => {
        const gpsRef = ref(db, '/status/app/gps');
        const geoFenceRef = ref(db, '/status/gps/geofence');
        const settingRef = ref(db, '/status/app/notifications/geoFenceBreach');

        let gps = false;
        let geoFence = true;

        const unsubscribeSetting = onValue(settingRef, (snapshot) => {
            enabledRef.current = !!snapshot.val();
            console.log('Notification setting updated:', enabledRef.current);
        });

        const maybeTriggerNotification = async () => {
            if (!enabledRef.current) return;

            if (gps && !geoFence && !triggeredRef.current) {
                triggeredRef.current = true;

                try {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Bear Left Safe Zone',
                            body: 'GPS is active and the bear is outside the designated area!',
                            sound: 'default',
                        },
                        trigger: null,
                    });
                    console.log('Notification sent');
                } catch (err) {
                    console.error('Failed to send notification:', err);
                }
            }

            if (!gps || geoFence) {
                triggeredRef.current = false;
            }
        };

        const unsubscribeGps = onValue(gpsRef, (snapshot) => {
            gps = !!snapshot.val();
            maybeTriggerNotification();
        });

        const unsubscribeGeoFence = onValue(geoFenceRef, (snapshot) => {
            geoFence = !!snapshot.val();
            maybeTriggerNotification();
        });

        return () => {
            unsubscribeSetting();
            unsubscribeGps();
            unsubscribeGeoFence();
        };
    }, []);

    return <>{children}</>;
};
