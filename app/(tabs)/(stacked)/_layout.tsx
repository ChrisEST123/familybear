import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 18,
                },
            }}
        >
            <Stack.Screen
                name="heartbeatSettings"
                options={{
                    title: 'Choose heartbeat settings',
                    headerBackVisible: true,
                }}
            />

            <Stack.Screen
                name="gps"
                options={{
                    title: 'Bear GPS',
                    headerBackVisible: true,
                }}
            />
        </Stack>
    );
}
