import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import BearStatusTileWrapper from './BearStatusTileWrapper';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import { globalStyles } from '@/constants/styles';
import {
    subscribeToActiveHeartbeatSetting,
    subscribeToBatteryLevel,
    subscribeToBearGpsData,
    subscribeToGpsEnabled,
    subscribeToLastSeen,
    subscribeToVibrationStatus,
} from '@/services/firebase/subscribers';

const HomeScreen: React.FC = () => {
    const router = useRouter();

    const [heartbeatPreset, setHeartbeatPreset] = useState({
        id: 'test-id',
        label: 'Test',
    });
    const [vibration, setVibration] = useState(false);
    const [connected, setConnected] = useState(false);
    const [gpsEnabled, setGpsEnabled] = useState(false);
    const [geoFenceStatus, setGeoFenceStatus] = useState<boolean | 'unknown'>(
        'unknown'
    );
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

    useEffect(() => {
        const unsubscribe = subscribeToVibrationStatus(setVibration);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let timeout: number;

        const unsubscribe = subscribeToLastSeen((lastSeen) => {
            if (!lastSeen) {
                setConnected(false);
                return;
            }

            const check = () => {
                const now = Date.now();
                const lastSeenMs = lastSeen * 1000;

                setConnected(now - lastSeenMs < 10000);
            };

            check();

            clearInterval(timeout);
            timeout = setInterval(check, 1000);
        });

        return () => {
            unsubscribe();
            clearInterval(timeout);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToActiveHeartbeatSetting((preset) => {
            if (preset) setHeartbeatPreset(preset);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubGps = subscribeToGpsEnabled(setGpsEnabled);
        const unsubGpsData = subscribeToBearGpsData((data) => {
            if ('geoFence' in data && typeof data.geoFence === 'boolean') {
                setGeoFenceStatus(data.geoFence);
            } else {
                setGeoFenceStatus('unknown');
            }
        });

        return () => {
            unsubGps();
            unsubGpsData();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToBatteryLevel(setBatteryLevel);
        return () => unsubscribe();
    }, []);

    return (
        <View style={globalStyles.root}>
            <ScrollView contentContainerStyle={globalStyles.container}>
                <View style={styles.statusGrid}>
                    <BearStatusTileWrapper
                        type="connection"
                        value={connected}
                    />
                    <BearStatusTileWrapper
                        type="battery"
                        value={batteryLevel ?? 0}
                    />
                    <BearStatusTileWrapper type="vibration" value={vibration} />
                    <BearStatusTileWrapper
                        type="heartbeat"
                        value={heartbeatPreset!.label}
                    />
                    <BearStatusTileWrapper type="gps" value={gpsEnabled} />
                    <BearStatusTileWrapper
                        type="geoFence"
                        value={gpsEnabled ? geoFenceStatus : 'unknown'}
                    />
                </View>

                <PrimaryButton
                    label="Change Heartbeat Setting"
                    onPress={() =>
                        router.push('/(tabs)/(stacked)/heartbeatSettings')
                    }
                />

                <PrimaryButton
                    label="Bear GPS"
                    onPress={() => router.push('/(tabs)/(stacked)/gps')}
                />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
});
