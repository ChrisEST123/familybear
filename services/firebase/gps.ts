import { ref, set } from 'firebase/database';

import { db } from '../../firebase';

export const setGpsEnabled = (enabled: boolean) => {
    return set(ref(db, '/status/app/gps'), enabled);
};
