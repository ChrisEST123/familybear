import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import BearStatusTileWrapper from './BearStatusTileWrapper';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import { globalStyles } from '@/constants/styles';

const HomeScreen: React.FC = () => {
    const router = useRouter();

    const [heartbeatPreset, setHeartbeatPreset] = useState({
        key: 'preRecorded1',
        label: 'PreRecorded1',
    });

    const handleWakeupMode = () => {
        console.log('[Action] Wake Up Mode Settings');
    };

    return (
        <View style={globalStyles.root}>
            <ScrollView contentContainerStyle={globalStyles.container}>
                <View style={styles.statusGrid}>
                    <BearStatusTileWrapper type="connection" value />
                    <BearStatusTileWrapper type="battery" value={82} />
                    <BearStatusTileWrapper type="vibration" value={false} />
                    <BearStatusTileWrapper
                        type="heartbeat"
                        value={heartbeatPreset.label}
                    />
                </View>

                <PrimaryButton
                    label="Change Heartbeat Setting"
                    onPress={() =>
                        router.push('/(tabs)/(stacked)/HeartbeatSettings')
                    }
                />
                <PrimaryButton
                    label="Wake Up Mode Settings"
                    onPress={handleWakeupMode}
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
