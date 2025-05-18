import { ref, set } from 'firebase/database';

import { db } from '../../firebase';

/**
 * Enables or disables GPS tracking in the app status.
 *
 * @param enabled - True to enable GPS, false to disable
 * @returns A Promise that resolves when the status is updated in Firebase
 */
export const setGpsEnabled = (enabled: boolean) => {
    return set(ref(db, '/status/app/gps'), enabled);
};
