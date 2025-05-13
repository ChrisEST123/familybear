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

export const subscribeToConnectionStatus = (
    callback: (connected: boolean) => void
): Unsubscribe => {
    const connectionRef = ref(db, '/status/bear/connection');

    const unsubscribe = onValue(connectionRef, (snapshot) => {
        if (!snapshot.exists()) {
            callback(false);
        } else {
            callback(!!snapshot.val());
        }
    });

    return () => unsubscribe();
};
