import { useNavigation } from '@react-navigation/native';
import { ref, set } from 'firebase/database';
import React, { useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    Switch,
    Alert,
} from 'react-native';

import BearStatusTileWrapper from './BearStatusTileWrapper';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { globalStyles } from '@/constants/styles';
import { db } from '@/firebase';

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

    const handleApplyCustom = () => {
        const bpm = parseInt(customBpm, 10);
        const freq = parseFloat(customFreq);
        const amp = parseFloat(customAmp);
        const durationSec = parseInt(customDuration, 10);

        if (
            isNaN(bpm) ||
            bpm < 30 ||
            bpm > 180 ||
            isNaN(freq) ||
            freq < 0.5 ||
            freq > 100 ||
            isNaN(amp) ||
            amp < 0 ||
            amp > 1 ||
            isNaN(durationSec) ||
            durationSec < 1 ||
            durationSec > 120
        ) {
            Alert.alert(
                'Validation Error',
                'Please enter safe and valid values for all fields.'
            );
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

                <View style={styles.optionBox}>
                    <PrimaryButton
                        label="Use Real-Time Heartbeat"
                        onPress={() => setMode('realtime')}
                    />
                    <PrimaryButton
                        label="Use a Preset"
                        onPress={() => setMode('preset')}
                    />
                    <PrimaryButton
                        label="Create Custom Pattern"
                        onPress={() => setMode('custom')}
                    />
                </View>

                {mode === 'preset' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Preset Options</Text>
                        {/* TODO: Add preset dropdown or cards */}
                        <Text style={styles.placeholder}>
                            Preset picker goes here
                        </Text>
                    </View>
                )}

                {mode === 'custom' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Custom Heartbeat Settings
                        </Text>

                        <Text style={styles.label}>
                            Target Heart Rate (BPM)
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 80"
                            keyboardType="numeric"
                            value={customBpm}
                            onChangeText={setCustomBpm}
                        />

                        <Text style={styles.label}>
                            Vibration Frequency (Hz)
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 1.2"
                            keyboardType="numeric"
                            value={customFreq}
                            onChangeText={setCustomFreq}
                        />

                        <Text style={styles.label}>Amplitude (0.0 - 1.0)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 0.9"
                            keyboardType="numeric"
                            value={customAmp}
                            onChangeText={setCustomAmp}
                        />

                        <Text style={styles.label}>Duration (seconds)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 60"
                            keyboardType="numeric"
                            value={customDuration}
                            onChangeText={setCustomDuration}
                        />

                        <View style={styles.switchRow}>
                            <Text style={styles.label}>Enable Wakeup Mode</Text>
                            <Switch
                                value={wakeupMode}
                                onValueChange={setWakeupMode}
                            />
                        </View>

                        <PrimaryButton
                            label="Apply Custom Heartbeat"
                            onPress={handleApplyCustom}
                        />
                    </View>
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
