import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import BearStatusTileWrapper from './BearStatusTileWrapper';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import { globalStyles } from '@/constants/styles';
import {
    subscribeToActiveHeartbeatSetting,
    subscribeToConnectionStatus,
    subscribeToVibrationStatus,
} from '@/services/firebase/subscribers';

const HomeScreen: React.FC = () => {
    const router = useRouter();

    const [heartbeatPreset, setHeartbeatPreset] = useState({
        id: 'test-id',
        label: 'Test',
    });
    const [vibration, setVibration] = useState(false);
    const [connection, setConnection] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToVibrationStatus(setVibration);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToConnectionStatus(setConnection);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToActiveHeartbeatSetting((preset) => {
            if (preset) setHeartbeatPreset(preset);
        });

        return () => unsubscribe(); // clean up listener
    }, []);

    return (
        <View style={globalStyles.root}>
            <ScrollView contentContainerStyle={globalStyles.container}>
                <View style={styles.statusGrid}>
                    <BearStatusTileWrapper
                        type="connection"
                        value={connection}
                    />
                    <BearStatusTileWrapper type="battery" value={82} />
                    <BearStatusTileWrapper type="vibration" value={vibration} />
                    <BearStatusTileWrapper
                        type="heartbeat"
                        value={heartbeatPreset!.label}
                    />
                </View>

                <PrimaryButton
                    label="Change Heartbeat Setting"
                    onPress={() =>
                        router.push('/(tabs)/(stacked)/heartbeatSettings')
                    }
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
