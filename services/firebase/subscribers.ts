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
