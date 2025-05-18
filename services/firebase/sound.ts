import { ref, set, get } from 'firebase/database';

import { db } from '@/firebase';

/**
 * Represents a sound command sent to the bear.
 */
export interface SoundCommand {
    pattern: string; // Name/identifier of the sound pattern (e.g., 'alert', 'merryxmas')
    timestamp: number; // Time the command was issued
}

/**
 * Sends a sound pattern command to Firebase, instructing the bear to play it.
 *
 * @param pattern - The sound pattern to play
 */
export const playSoundPattern = async (pattern: string): Promise<void> => {
    const soundData: SoundCommand = {
        pattern,
        timestamp: Date.now(),
    };

    await set(ref(db, '/commands/sound'), soundData);
};

/**
 * Fetches the currently active sound pattern command from Firebase.
 *
 * @returns The pattern name if found, otherwise null
 */
export const fetchActiveSoundPattern = async (): Promise<string | null> => {
    const snapshot = await get(ref(db, '/commands/sound'));
    if (!snapshot.exists()) return null;

    const data = snapshot.val();
    return data?.pattern || null;
};
