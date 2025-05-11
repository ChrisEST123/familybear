import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Platform } from 'react-native';

export default function Layout() {
    const backIcon =
        Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back-sharp';

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
                name="HeartbeatSettings"
                options={{
                    title: 'Choose heartbeat settings',
                    headerLeft: () => (
                        <Ionicons
                            name={backIcon}
                            size={25}
                            color="black"
                            style={{
                                marginLeft: Platform.OS === 'android' ? 0 : 8,
                            }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />
        </Stack>
    );
}
