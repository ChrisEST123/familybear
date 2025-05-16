import { ref, set } from 'firebase/database';

import { db } from '@/firebase';

export const sendHeatTemperature = async (temperature: number) => {
    const refTemp = ref(db, '/commands/heat/temperature');
    return set(refTemp, temperature);
};

export const setHeatActive = async (active: boolean) => {
    const refActive = ref(db, '/commands/heat/active');
    return set(refActive, active);
};
