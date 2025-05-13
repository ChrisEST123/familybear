import { ref, set } from 'firebase/database';

import { db } from '@/firebase';

export const updateWakeupMode = async (
    time: string,
    enabled: boolean
): Promise<void> => {
    await set(ref(db, '/commands/wakeupmode'), {
        time,
        enabled,
        timestamp: Date.now(),
    });
};
