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

    useEffect(() => {
        const gpsRef = ref(db, '/status/app/gps');
        const geoFenceRef = ref(db, '/status/bear/gps/geoFence');

        let gps = false;
        let geoFence = true;

        const maybeTriggerNotification = () => {
            if (gps && !geoFence && !triggeredRef.current) {
                triggeredRef.current = true;

                Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Bear Left Safe Zone',
                        body: 'GPS is active and the bear is outside the designated area!',
                        sound: 'default',
                    },
                    trigger: null,
                });
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
            unsubscribeGps();
            unsubscribeGeoFence();
        };
    }, []);

    return <>{children}</>;
};
