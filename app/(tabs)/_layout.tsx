import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
            title: 'FamilyBear Dashboard',
            tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
            ),
        }}
        />

        <Tabs.Screen
        name="bearSettings"
        options={{
            title: 'Bear Settings',
            tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
            ),
        }}
        />

        <Tabs.Screen
        name="appSettings"
        options={{
            title: 'App Settings',
            tabBarIcon: ({ color, size }) => (
            <FontAwesome name="sliders" size={size} color={color} />
            ),
        }}
        />
    </Tabs>
  );
}
