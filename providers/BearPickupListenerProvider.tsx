import React, { useEffect, ReactNode, useRef } from 'react';

import { subscribeToFsrStatus } from '@/services/firebase/subscribers';
import { loadWatchNotificationImage } from '@/services/firebase/watchImageUpload';
import { sendWatchNotification } from '@/services/watch/sendNotification';

interface Props {
    children: ReactNode;
}

export const BearPickupListenerProvider: React.FC<Props> = ({ children }) => {
    const triggeredRef = useRef(false);

    useEffect(() => {
        const unsubscribe = subscribeToFsrStatus(async (value) => {
            if (value && !triggeredRef.current) {
                triggeredRef.current = true;

                const imageUri = await loadWatchNotificationImage();

                await sendWatchNotification({
                    title: 'Bear Alert!',
                    message: 'Your bear is calling.',
                    imageUri: imageUri ?? undefined,
                });
            }

            if (!value) {
                triggeredRef.current = false;
            }
        });

        return unsubscribe;
    }, []);

    return <>{children}</>;
};
