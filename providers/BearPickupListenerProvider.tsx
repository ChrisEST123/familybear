import React, { useEffect, ReactNode, useRef } from 'react';

import { subscribeToFsrStatus } from '@/services/firebase/subscribers';
import { loadWatchNotificationImageUrl } from '@/services/firebase/watchImageUpload';
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

                const imageUrl = await loadWatchNotificationImageUrl();

                await sendWatchNotification({
                    title: 'Bear Alert!',
                    message: 'Your bear is calling.',
                    imageUrl: imageUrl ?? undefined,
                });

                console.log('[FSR] Triggered with image:', imageUrl);
            }

            if (!value) {
                triggeredRef.current = false;
            }
        });

        return unsubscribe;
    }, []);

    return <>{children}</>;
};
