import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
    Switch,
    Modal,
} from 'react-native';

import BearStatusTileWrapper from '@/components/BearStatusTileWrapper';
import { ModalWrapper } from '@/components/basic/ModalWrapper';
import PrimaryButton from '@/components/basic/PrimaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { globalStyles } from '@/constants/styles';
import { sendHeatTemperature, setHeatActive } from '@/services/firebase/heat';
import { subscribeToBearHeatStatus } from '@/services/firebase/subscribers';
import { readCurrentTemperature } from '@/services/temperature/liveTemperatureService';

const HeatSettingsScreen: React.FC = () => {
    const [mode, setMode] = useState<'live' | 'custom' | undefined>();
    const [prevMode, setPrevMode] = useState<typeof mode>();
    const [customTemperature, setCustomTemperature] = useState('');
    const [liveReading, setLiveReading] = useState<number | null>(null);
    const [showLiveModal, setShowLiveModal] = useState(false);
    const [heatStatus, setHeatStatus] = useState<{
        temperature: number;
        active: boolean;
    } | null>(null);

    useEffect(() => {
        const unsub = subscribeToBearHeatStatus(setHeatStatus);
        return () => unsub();
    }, []);

    useEffect(() => {
        if (mode === 'custom' && prevMode === 'live') {
            setLiveReading(null);
        } else if (mode === 'live' && prevMode === 'custom') {
            setCustomTemperature('');
        }
    }, [mode, prevMode]);

    const handleModeChange = async (newMode: typeof mode) => {
        setPrevMode(mode);
        setMode(newMode);

        if (newMode === 'live') {
            try {
                const value = await readCurrentTemperature();
                setLiveReading(value);
                setShowLiveModal(true);
            } catch (err) {
                console.error('Error reading temp:', err);
                Alert.alert('Error', 'Could not read live temperature');
                setMode(undefined);
            }
        }
    };

    const handleApplyLiveTemp = async () => {
        if (liveReading === null) return;
        try {
            await sendHeatTemperature(liveReading);
            Alert.alert('Success', `Live temperature ${liveReading}°C applied`);
            setShowLiveModal(false);
        } catch (err) {
            console.error('Error sending temp:', err);
            Alert.alert('Error', 'Failed to apply temperature');
        }
    };

    const handleApplyCustomTemperature = async () => {
        const value = parseFloat(customTemperature.trim());
        if (isNaN(value) || value < 34 || value > 39) {
            Alert.alert(
                'Invalid Input',
                'Temperature must be between 34°C and 39°C.'
            );
            return;
        }

        try {
            await sendHeatTemperature(value);
            Alert.alert('Success', `Temperature set to ${value}°C`);
        } catch (err) {
            console.error('Failed to send temperature:', err);
            Alert.alert('Error', 'Could not apply heat setting.');
        }
    };

    const handleToggleHeat = async (val: boolean) => {
        try {
            await setHeatActive(val);
        } catch (err) {
            console.error('Failed to toggle heating:', err);
            Alert.alert('Error', 'Could not update heating state.');
        }
    };

    return (
        <View style={globalStyles.root}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.statusGrid}>
                    <BearStatusTileWrapper
                        type="heat"
                        value={heatStatus?.active ? 'On' : 'Off'}
                    />
                    <BearStatusTileWrapper
                        type="temperature"
                        value={
                            typeof heatStatus?.temperature === 'number'
                                ? `${heatStatus.temperature.toFixed(1)}°C`
                                : '--'
                        }
                    />
                </View>

                <View style={styles.switchRow}>
                    <Text style={styles.label}>Heating Active</Text>
                    <Switch
                        value={!!heatStatus?.active}
                        onValueChange={handleToggleHeat}
                    />
                </View>

                <View style={styles.optionBox}>
                    <PrimaryButton
                        label="Use Custom Temperature"
                        onPress={() => handleModeChange('custom')}
                    />
                    <PrimaryButton
                        label="Use Realtime Heating"
                        onPress={() => handleModeChange('live')}
                    />
                </View>

                {mode === 'custom' && (
                    <View>
                        <Text style={styles.label}>
                            Target Temperature (°C)
                        </Text>
                        <TextInput
                            value={customTemperature}
                            onChangeText={setCustomTemperature}
                            keyboardType="numeric"
                            placeholder="e.g. 37"
                            style={styles.input}
                            maxLength={4}
                        />
                        <PrimaryButton
                            label="Apply Temperature"
                            onPress={handleApplyCustomTemperature}
                        />
                    </View>
                )}
            </ScrollView>

            <ModalWrapper
                visible={showLiveModal}
                message={`Use ${liveReading?.toFixed(1)}°C from smartwatch?`}
                confirmLabel="Yes, Apply"
                cancelLabel="Cancel"
                onConfirm={handleApplyLiveTemp}
                onCancel={() => {
                    setShowLiveModal(false);
                    setMode(undefined);
                    setLiveReading(null);
                }}
            />
        </View>
    );
};

export default HeatSettingsScreen;

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        backgroundColor: colors.background,
    },
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: spacing.lg,
    },
    optionBox: {
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textSecondary,
        marginTop: spacing.sm,
    },
    input: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: spacing.sm,
        marginTop: 4,
        marginBottom: spacing.md,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    modalBox: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.lg,
        width: '100%',
        alignItems: 'center',
        gap: spacing.md,
    },
    modalText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: spacing.md,
        textAlign: 'center',
        color: colors.textPrimary,
    },
});
