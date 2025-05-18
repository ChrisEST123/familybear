import { ref, set } from 'firebase/database';

import { db } from '@/firebase';

/**
 * Sends a new target temperature to the bear's heat controller.
 *
 * @param temperature - Desired temperature to set (e.g., 36.5)
 * @returns A Promise that resolves when the value is written
 */
export const sendHeatTemperature = async (temperature: number) => {
    const refTemp = ref(db, '/commands/heat/temperature');
    return set(refTemp, temperature);
};

/**
 * Enables or disables the heat feature on the bear.
 *
 * @param active - True to turn heat on, false to turn it off
 * @returns A Promise that resolves when the value is written
 */
export const setHeatActive = async (active: boolean) => {
    const refActive = ref(db, '/commands/heat/active');
    return set(refActive, active);
};
