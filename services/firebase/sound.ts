import { ref, set, get } from 'firebase/database';

import { db } from '@/firebase';

export interface SoundCommand {
    pattern: string;
    timestamp: number;
}

export const playSoundPattern = async (pattern: string): Promise<void> => {
    const soundData: SoundCommand = {
        pattern,
        timestamp: Date.now(),
    };

    await set(ref(db, '/commands/sound'), soundData);
};

export const fetchActiveSoundPattern = async (): Promise<string | null> => {
    const snapshot = await get(ref(db, '/commands/sound'));
    if (!snapshot.exists()) return null;

    const data = snapshot.val();
    return data?.pattern || null;
};
