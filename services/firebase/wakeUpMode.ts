import { ref, set } from 'firebase/database';

import { db } from '@/firebase';

/**
 * Updates the wake-up mode command in Firebase.
 * This sets a scheduled wake-up time and its enabled state.
 *
 * @param time - The time string when wake-up mode should activate (e.g., '07:30')
 * @param enabled - Whether the wake-up mode is turned on or off
 */
export const updateWakeupMode = async (
    time: string,
    enabled: boolean
): Promise<void> => {
    await set(ref(db, '/commands/wakeupmode'), {
        time, // Scheduled time for wake-up
        enabled, // Activation flag
        timestamp: Date.now(), // Client-side timestamp of the update
    });
};
