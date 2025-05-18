import { onValue, ref, Unsubscribe } from 'firebase/database';

import { HeartbeatPreset } from './presets';

import { db } from '@/firebase';

/**
 * Subscribes to the currently active heartbeat command/preset.
 * Useful for live monitoring or UI syncing.
 */
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

    return () => unsubscribe(); // Cleanup function
};

/**
 * Subscribes to the current vibration status of the bear.
 * Expects a boolean indicating whether vibration is active.
 */
export const subscribeToVibrationStatus = (
    callback: (vibration: boolean) => void
): Unsubscribe => {
    const vibrationRef = ref(db, '/status/bear/vibration');

    const unsubscribe = onValue(vibrationRef, (snapshot) => {
        callback(!!snapshot.val());
    });

    return () => unsubscribe();
};

/**
 * Subscribes to the bear's FSR (pickup sensor) status.
 * Calls back with true/false depending on pickup state.
 */
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

/**
 * Subscribes to wake-up mode configuration (enabled flag + time string).
 */
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

/**
 * Subscribes to the timestamp of the bear's last known activity.
 * Returns null if the value doesn't exist.
 */
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

/**
 * Subscribes to GPS location and optional geoFence value.
 * Callback is only triggered if both latitude and longitude exist.
 */
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

/**
 * Subscribes to the boolean flag indicating if GPS tracking is enabled.
 */
export const subscribeToGpsEnabled = (callback: (value: boolean) => void) => {
    const gpsRef = ref(db, '/status/app/gps');

    return onValue(gpsRef, (snapshot) => {
        callback(!!snapshot.val());
    });
};

/**
 * Subscribes to the bear's battery level (numeric percentage).
 */
export const subscribeToBatteryLevel = (callback: (level: number) => void) => {
    const batteryRef = ref(db, '/status/bear/battery');

    return onValue(batteryRef, (snapshot) => {
        const val = snapshot.val();
        if (typeof val === 'number') callback(val);
    });
};

/**
 * Subscribes to current heat status: active flag and temperature value.
 */
export const subscribeToBearHeatStatus = (
    callback: (data: { temperature: number; active: boolean }) => void
) => {
    const refPath = ref(db, '/commands/heat');

    return onValue(refPath, (snapshot) => {
        const val = snapshot.val();
        if (
            val &&
            typeof val.temperature === 'number' &&
            typeof val.active === 'boolean'
        ) {
            callback(val);
        }
    });
};
