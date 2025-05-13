import { ref, get, push, set } from 'firebase/database';

import { db } from '@/firebase';

export interface HeartbeatPreset {
    id: string;
    label: string;
    beatsPerMinute: number;
    vibrationFrequencyHz: number;
    amplitude: number;
}

export const fetchHeartbeatPresets = async (): Promise<HeartbeatPreset[]> => {
    const snapshot = await get(ref(db, '/presets/heartbeat'));
    if (!snapshot.exists()) return [];
    const data = snapshot.val();
    return Object.entries(data).map(([id, value]) => ({
        id,
        ...(value as Omit<HeartbeatPreset, 'id'>),
    }));
};

export const activateHeartbeatPreset = async (
    preset: Omit<HeartbeatPreset, 'id'>
): Promise<void> => {
    const newRef = ref(db, '/commands/heartbeat');
    await set(newRef, preset);
};

export const saveCustomHeartbeatPreset = async (
    preset: Omit<HeartbeatPreset, 'id'>
): Promise<void> => {
    const newRef = push(ref(db, '/presets/heartbeat'));
    await set(newRef, preset);
};

export const fetchActiveHeartbeatSetting =
    async (): Promise<HeartbeatPreset | null> => {
        const snapshot = await get(ref(db, '/commands/heartbeat'));
        if (!snapshot.exists()) return null;
        return snapshot.val() as HeartbeatPreset;
    };
