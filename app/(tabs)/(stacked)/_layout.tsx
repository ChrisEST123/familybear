import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            // Default styling for all headers in this stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 18,
                },
            }}
        >
            {/* Heartbeat settings screen */}
            <Stack.Screen
                name="heartbeatSettings"
                options={{
                    title: 'Choose heartbeat settings', // Screen title in header
                    headerBackVisible: true, // Show back button in header
                }}
            />

            {/* GPS tracking status and controls */}
            <Stack.Screen
                name="gps"
                options={{
                    title: 'Bear GPS',
                    headerBackVisible: true,
                }}
            />

            {/* Heat settings screen for controlling temperature */}
            <Stack.Screen
                name="heatSettings"
                options={{
                    title: 'Choose heat settings',
                    headerBackVisible: true,
                }}
            />
        </Stack>
    );
}
