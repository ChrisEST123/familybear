import { useFocusEffect } from 'expo-router';
import { ref, set } from 'firebase/database';
import React, { useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';

import BearStatusTileWrapper from '@/components/BearStatusTileWrapper';
import { CustomHeartbeatForm } from '@/components/heartbeat/CustomHeartbeatForm';
import { HeartbeatModeSelector } from '@/components/heartbeat/HeartbeatModeSelector';
import { PresetPicker } from '@/components/heartbeat/PresetPicker';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { globalStyles } from '@/constants/styles';
import { db } from '@/firebase';
import { validateHeartbeatInput } from '@/utils/validations';

const HeartbeatSettingsScreen: React.FC = () => {
    const [mode, setMode] = useState<'realtime' | 'preset' | 'custom'>();

    const [customBpm, setCustomBpm] = useState('');
    const [customFreq, setCustomFreq] = useState('');
    const [customAmp, setCustomAmp] = useState('');
    const [customDuration, setCustomDuration] = useState('');
    const [wakeupMode, setWakeupMode] = useState(false);
    const [activePreset, setActivePreset] = useState({
        key: 'activePreset',
        label: 'PreRecorded1',
    });

    useFocusEffect(
        useCallback(() => {
            return () => {
                setMode(undefined);
            };
        }, [])
    );

    const handleApplyCustom = () => {
        const bpm = parseInt(customBpm, 10);
        const freq = parseFloat(customFreq);
        const amp = parseFloat(customAmp);
        const durationSec = parseInt(customDuration, 10);

        const error = validateHeartbeatInput({ bpm, freq, amp, durationSec });
        if (error) {
            Alert.alert('Validation Error', error);
            return;
        }

        const payload = {
            beatsPerMinute: bpm,
            vibrationFrequencyHz: freq,
            amplitude: amp,
            durationMs: durationSec * 1000,
            wakeupMode,
            timestamp: Date.now(),
        };

        console.log('Sending to Firebase:', payload);
        set(ref(db, '/commands/heartbeat'), payload);
    };

    return (
        <View style={globalStyles.root}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.statusGrid}>
                    <BearStatusTileWrapper
                        type="heartbeat"
                        value={activePreset.label}
                    />
                    <BearStatusTileWrapper
                        type="wakeupMode"
                        value={wakeupMode}
                    />
                </View>

                <HeartbeatModeSelector mode={mode} setMode={setMode} />

                {mode === 'preset' && <PresetPicker />}

                {mode === 'custom' && (
                    <CustomHeartbeatForm
                        bpm={customBpm}
                        setBpm={setCustomBpm}
                        freq={customFreq}
                        setFreq={setCustomFreq}
                        amp={customAmp}
                        setAmp={setCustomAmp}
                        duration={customDuration}
                        setDuration={setCustomDuration}
                        wakeupMode={wakeupMode}
                        setWakeupMode={setWakeupMode}
                        onApply={handleApplyCustom}
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
