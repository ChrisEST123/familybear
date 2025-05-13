import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { heartbeatStyles as styles } from './styles';
import PrimaryButton from '../basic/PrimaryButton';

interface Props {
    bpm: string;
    setBpm: (v: string) => void;
    freq: string;
    setFreq: (v: string) => void;
    amp: string;
    setAmp: (v: string) => void;
    amplitudeOptions?: string[]; // optional dropdown values
    presetLabel: string;
    setPresetLabel: (v: string) => void;
    wakeupMode?: boolean;
    setWakeupMode?: (v: boolean) => void;
    onApply: () => void;
    editableBpm?: boolean;
    editableFreq?: boolean;
    showWakeup?: boolean;
    isLive?: boolean;
}

export const CustomHeartbeatForm: React.FC<Props> = ({
    bpm,
    setBpm,
    freq,
    setFreq,
    amp,
    setAmp,
    presetLabel,
    setPresetLabel,
    onApply,
    editableBpm = true,
    editableFreq = true,
    isLive = false,
}) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>
            {isLive ? 'Live Heartbeat Settings' : 'Custom Heartbeat Settings'}
        </Text>

        <Text style={styles.label}>Target Heart Rate (BPM)</Text>
        <TextInput
            style={[styles.input, !editableBpm && { opacity: 0.6 }]}
            placeholder="e.g. 80"
            keyboardType="numeric"
            value={bpm}
            editable={editableBpm}
            onChangeText={setBpm}
        />

        <Text style={styles.label}>Vibration Frequency (Hz)</Text>
        <TextInput
            style={[styles.input, !editableFreq && { opacity: 0.6 }]}
            placeholder="e.g. 1.2"
            keyboardType="numeric"
            value={freq}
            editable={editableFreq}
            onChangeText={setFreq}
        />

        <Text style={styles.label}>Amplitude</Text>
        <View style={styles.pickerWrapper}>
            <Picker
                selectedValue={amp}
                onValueChange={setAmp}
                style={styles.picker}
            >
                <Picker.Item label="Low (0.3)" value="0.3" />
                <Picker.Item label="Medium (0.6)" value="0.6" />
                <Picker.Item label="High (0.9)" value="0.9" />
            </Picker>
        </View>

        <Text style={styles.label}>Preset Name</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. Realtime Boost"
            value={presetLabel}
            onChangeText={setPresetLabel}
        />

        <PrimaryButton
            label={
                isLive ? 'Activate Live Heartbeat' : 'Activate Custom Heartbeat'
            }
            onPress={onApply}
        />
    </View>
);
