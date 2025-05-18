import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs
            // Global screen styling for all tabs
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 18,
                },
            }}
        >
            {/* Home/Dashboard tab */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'FamilyBear Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />

            {/* Bear settings screen (e.g., heartbeat, sound, heat) */}
            <Tabs.Screen
                name="bearSettings"
                options={{
                    title: 'Bear Settings',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="cog" size={size} color={color} />
                    ),
                }}
            />

            {/* App-level configuration/settings screen */}
            <Tabs.Screen
                name="appSettings"
                options={{
                    title: 'App Settings',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="sliders" size={size} color={color} />
                    ),
                }}
            />

            {/* Hidden route for stacked navigation flows (e.g., detail views) */}
            <Tabs.Screen
                name="(stacked)"
                options={{
                    href: null, // Prevents it from showing in the tab bar
                    headerShown: false, // Hides header when this stack is active
                }}
            />
        </Tabs>
    );
}
