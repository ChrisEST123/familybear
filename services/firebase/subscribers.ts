import { onValue, ref, Unsubscribe } from 'firebase/database';

import { HeartbeatPreset } from './presets';

import { db } from '@/firebase';

export const subscribeToActiveHeartbeatSetting = (
    callback: (preset: HeartbeatPreset | null) => void
): Unsubscribe => {
    const heartbeatRef = ref(db, '/commands/heartbeat');

    const unsubscribe = onValue(heartbeatRef, (snapshot) => {
        if (!snapshot.exists()) {
            callback(null);
        } else {
            callback(snapshot.val());
        }
    });

    return () => unsubscribe(); // For cleanup
};

export const subscribeToVibrationStatus = (
    callback: (vibration: boolean) => void
): Unsubscribe => {
    const vibrationRef = ref(db, '/status/bear/vibration');

    const unsubscribe = onValue(vibrationRef, (snapshot) => {
        callback(!!snapshot.val());
    });

    return () => unsubscribe();
};

export const subscribeToFsrStatus = (
    callback: (fsrValue: boolean) => void
): Unsubscribe => {
    const fsrRef = ref(db, '/status/bear/fsr');

    const unsubscribe = onValue(fsrRef, (snapshot) => {
        if (!snapshot.exists()) {
            callback(false);
        } else {
            callback(!!snapshot.val());
        }
    });

    return () => unsubscribe();
};

export const subscribeToWakeupModeStatus = (
    callback: (data: { enabled: boolean; time: string }) => void
): Unsubscribe => {
    const wakeupRef = ref(db, '/commands/wakeupmode');
    const unsubscribe = onValue(wakeupRef, (snapshot) => {
        if (!snapshot.exists()) {
            callback({ enabled: false, time: '' });
            return;
        }

        const data = snapshot.val();
        callback({
            enabled: !!data.enabled,
            time: data.time || '',
        });
    });

    return () => unsubscribe();
};

export const subscribeToLastSeen = (
    callback: (lastSeen: number | null) => void
): Unsubscribe => {
    const lastSeenRef = ref(db, '/status/bear/lastSeen');

    const unsubscribe = onValue(lastSeenRef, (snapshot) => {
        if (!snapshot.exists()) {
            callback(null);
        } else {
            callback(Number(snapshot.val()));
        }
    });

    return () => unsubscribe();
};

export const subscribeToBearGpsData = (
    callback: (data: {
        latitude: number;
        longitude: number;
        geoFence?: string;
    }) => void
) => {
    const gpsRef = ref(db, '/status/gps');
    return onValue(gpsRef, (snapshot) => {
        const val = snapshot.val();
        if (val?.latitude && val?.longitude) {
            callback(val);
        }
    });
};

export const subscribeToGpsEnabled = (callback: (value: boolean) => void) => {
    const gpsRef = ref(db, '/status/app/gps');
    return onValue(gpsRef, (snapshot) => {
        callback(!!snapshot.val());
    });
};

export const subscribeToBatteryLevel = (callback: (level: number) => void) => {
    const batteryRef = ref(db, '/status/bear/battery');
    return onValue(batteryRef, (snapshot) => {
        const val = snapshot.val();
        if (typeof val === 'number') callback(val);
    });
};
