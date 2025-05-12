import { Stack } from 'expo-router';

import { BearPickupListenerProvider } from '@/providers/BearPickupListenerProvider';

export default function Layout() {
    return (
        <BearPickupListenerProvider>
            <Stack
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: '600',
                        fontSize: 18,
                    },
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </BearPickupListenerProvider>
    );
}
