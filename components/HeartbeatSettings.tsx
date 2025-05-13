import { format } from 'date-fns/format';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import uuid from 'react-native-uuid';

import { WakeupScheduler } from './heartbeat/WakeupScheduler';

import BearStatusTileWrapper from '@/components/BearStatusTileWrapper';
import { CustomHeartbeatForm } from '@/components/heartbeat/CustomHeartbeatForm';
import { HeartbeatModeSelector } from '@/components/heartbeat/HeartbeatModeSelector';
import { PresetPicker } from '@/components/heartbeat/PresetPicker';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { globalStyles } from '@/constants/styles';
import {
    activateHeartbeatPreset,
    saveCustomHeartbeatPreset,
} from '@/services/firebase/presets';
import {
    subscribeToActiveHeartbeatSetting,
    subscribeToWakeupModeStatus,
} from '@/services/firebase/subscribers';
import { readCurrentHeartRate } from '@/services/heartRate/liveHeartRateService';
import { validateHeartbeatInput } from '@/utils/validations';

const HeartbeatSettingsScreen: React.FC = () => {
    const [mode, setMode] = useState<
        'realtime' | 'preset' | 'custom' | 'wakeupmode'
    >();

    const [customBpm, setCustomBpm] = useState('');
    const [customFreq, setCustomFreq] = useState('');
    const [customAmp, setCustomAmp] = useState('');
    const [wakeupModeStatus, setWakeupModeStatus] = useState({
        enabled: false,
        time: '',
    });
    const [heartbeatPreset, setHeartbeatPreset] = useState({
        id: 'test-id',
        label: 'Test',
    });
    const [presetLabel, setPresetLabel] = useState('');
    const [prevMode, setPrevMode] = useState<typeof mode>();
    const [wakeupScheduleEnabled, setWakeupScheduleEnabled] = useState(false);
    const [wakeupTime, setWakeupTime] = useState(new Date());

    useFocusEffect(
        useCallback(() => {
            return () => {
                setMode(undefined);
            };
        }, [])
    );

    useEffect(() => {
        const unsubscribe = subscribeToActiveHeartbeatSetting((preset) => {
            if (preset) setHeartbeatPreset(preset);
        });

        return () => unsubscribe(); // clean up listener
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToWakeupModeStatus(setWakeupModeStatus);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (wakeupModeStatus.time) {
            const [hh, mm] = wakeupModeStatus.time.split(':');
            const date = new Date();
            date.setHours(parseInt(hh, 10));
            date.setMinutes(parseInt(mm, 10));
            setWakeupTime(date);
        }
        setWakeupScheduleEnabled(wakeupModeStatus.enabled);
    }, [wakeupModeStatus]);

    useEffect(() => {
        if (mode === 'realtime') {
            const loadLiveData = async () => {
                try {
                    const bpm = await readCurrentHeartRate();
                    const now = new Date();

                    const time = format(now, 'HH:mm');
                    const date = format(now, 'MMM d, yyyy');
                    const label = `Realtime Capture @ ${time} • ${date}`;

                    setCustomBpm(String(bpm));
                    setCustomFreq((bpm / 60).toFixed(2));
                    setCustomAmp('0.6');
                    setPresetLabel(label);
                } catch (err) {
                    console.error('Failed to load live heart rate:', err);
                    Alert.alert('Error', 'Could not retrieve live heart rate.');
                    setMode(undefined);
                }
            };

            loadLiveData();
        }
    }, [mode]);

    useEffect(() => {
        if (mode === 'custom' && prevMode === 'realtime') {
            resetCustomFormFields();
        }
    }, [mode, prevMode]);

    const handleModeChange = (newMode: typeof mode) => {
        setPrevMode(mode);
        setMode(newMode);
    };

    const handleApplyCustom = async () => {
        const bpm = parseInt(customBpm, 10);
        const freq = parseFloat(customFreq);
        const amp = parseFloat(customAmp);

        const error = validateHeartbeatInput({ bpm, freq, amp });
        if (error) {
            Alert.alert('Validation Error', error);
            return;
        }

        if (!presetLabel.trim()) {
            Alert.alert(
                'Missing Label',
                'Please enter a name for your custom preset.'
            );
            return;
        }

        const payload = {
            id: uuid.v4(),
            beatsPerMinute: bpm,
            vibrationFrequencyHz: freq,
            amplitude: amp,
            label: presetLabel.trim(),
            timestamp: Date.now(),
        };

        try {
            // Send command to apply
            await activateHeartbeatPreset(payload);

            // Also save to presets
            await saveCustomHeartbeatPreset(payload);

            Alert.alert(
                'Custom Heartbeat Applied',
                'Your preset has been saved and applied.'
            );
            resetCustomFormFields();
        } catch (err) {
            console.error('Error applying custom heartbeat:', err);
            Alert.alert(
                'Error',
                'Something went wrong while applying the heartbeat.'
            );
        }
    };

    const resetCustomFormFields = () => {
        setCustomBpm('');
        setCustomFreq('');
        setCustomAmp('');
        setPresetLabel('');
    };

    return (
        <View style={globalStyles.root}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.statusGrid}>
                    <BearStatusTileWrapper
                        type="heartbeat"
                        value={heartbeatPreset!.label}
                    />
                    <BearStatusTileWrapper
                        type="wakeupMode"
                        value={
                            wakeupModeStatus.enabled
                                ? `Active @ ${wakeupModeStatus.time}`
                                : 'Inactive'
                        }
                    />
                </View>

                <HeartbeatModeSelector
                    mode={mode}
                    setMode={handleModeChange}
                    onUseRealTime={() => handleModeChange('realtime')}
                />

                {mode === 'realtime' && (
                    <CustomHeartbeatForm
                        bpm={customBpm}
                        setBpm={setCustomBpm}
                        freq={customFreq}
                        setFreq={setCustomFreq}
                        amp={customAmp}
                        setAmp={setCustomAmp}
                        onApply={handleApplyCustom}
                        presetLabel={presetLabel}
                        setPresetLabel={setPresetLabel}
                        editableBpm={false}
                        editableFreq={false}
                        showWakeup={false}
                        isLive
                    />
                )}

                {mode === 'preset' && <PresetPicker />}

                {mode === 'custom' && (
                    <CustomHeartbeatForm
                        bpm={customBpm}
                        setBpm={setCustomBpm}
                        freq={customFreq}
                        setFreq={setCustomFreq}
                        amp={customAmp}
                        setAmp={setCustomAmp}
                        onApply={handleApplyCustom}
                        presetLabel={presetLabel}
                        setPresetLabel={setPresetLabel}
                        showWakeup
                        editableBpm
                        editableFreq
                    />
                )}

                {mode === 'wakeupmode' && (
                    <WakeupScheduler
                        time={wakeupTime}
                        setTime={setWakeupTime}
                        enabled={wakeupScheduleEnabled}
                        setEnabled={setWakeupScheduleEnabled}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default HeartbeatSettingsScreen;

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: spacing.md,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    optionBox: {
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    section: {
        marginTop: spacing.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: spacing.md,
        color: colors.textPrimary,
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
    },
    placeholder: {
        fontStyle: 'italic',
        color: colors.textSecondary,
        paddingVertical: spacing.sm,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
});
