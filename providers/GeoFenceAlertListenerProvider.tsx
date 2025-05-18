import * as Notifications from 'expo-notifications';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useRef, ReactNode } from 'react';

import { db } from '@/firebase';

interface Props {
    children: ReactNode;
}

/**
 * This provider listens for geofence breaches when GPS is active
 * and notifies the user if the bear leaves the safe zone.
 */
export const GeoFenceAlertListenerProvider: React.FC<Props> = ({
    children,
}) => {
    // Tracks whether the alert has already been triggered to avoid duplicates
    const triggeredRef = useRef(false);

    // Tracks whether geofence notifications are enabled in settings
    const enabledRef = useRef(false);

    useEffect(() => {
        const gpsRef = ref(db, '/status/app/gps'); // GPS enabled state
        const geoFenceRef = ref(db, '/status/gps/geofence'); // Inside/outside fence
        const settingRef = ref(db, '/status/app/notifications/geoFenceBreach'); // Notification toggle

        let gps = false; // Whether GPS is on
        let geoFence = true; // Whether the bear is in the safe zone

        // Listen for changes to the geofence notification setting
        const unsubscribeSetting = onValue(settingRef, (snapshot) => {
            enabledRef.current = !!snapshot.val();
            console.log('Notification setting updated:', enabledRef.current);
        });

        /**
         * Checks if notification should be triggered based on current GPS + geofence status.
         */
        const maybeTriggerNotification = async () => {
            if (!enabledRef.current) return;

            // Only trigger if GPS is on, bear is outside the safe zone, and hasn't been triggered yet
            if (gps && !geoFence && !triggeredRef.current) {
                triggeredRef.current = true;

                try {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Bear Left Safe Zone',
                            body: 'GPS is active and the bear is outside the designated area!',
                            sound: 'default',
                        },
                        trigger: null, // Send immediately
                    });
                    console.log('Notification sent');
                } catch (err) {
                    console.error('Failed to send notification:', err);
                }
            }

            // Reset trigger flag if bear re-enters the zone or GPS is disabled
            if (!gps || geoFence) {
                triggeredRef.current = false;
            }
        };

        // Subscribe to GPS state changes
        const unsubscribeGps = onValue(gpsRef, (snapshot) => {
            gps = !!snapshot.val();
            maybeTriggerNotification();
        });

        // Subscribe to geofence status changes
        const unsubscribeGeoFence = onValue(geoFenceRef, (snapshot) => {
            geoFence = !!snapshot.val();
            maybeTriggerNotification();
        });

        // Cleanup all subscriptions on unmount
        return () => {
            unsubscribeSetting();
            unsubscribeGps();
            unsubscribeGeoFence();
        };
    }, []);

    // Wrap children to inject listener context (though no actual context API is used here)
    return <>{children}</>;
};
