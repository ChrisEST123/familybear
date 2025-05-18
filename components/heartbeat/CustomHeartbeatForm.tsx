import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { heartbeatStyles as styles } from './styles';
import PrimaryButton from '../basic/PrimaryButton';

interface Props {
    bpm: string; // beats per minute input
    setBpm: (v: string) => void;
    freq: string; // vibration frequency input
    setFreq: (v: string) => void;
    amp: string; // selected amplitude
    setAmp: (v: string) => void;
    amplitudeOptions?: string[]; // optional dropdown values (currently unused)
    presetLabel: string; // label for the preset
    setPresetLabel: (v: string) => void;
    wakeupMode?: boolean; // unused in this form, reserved for future
    setWakeupMode?: (v: boolean) => void; // unused
    onApply: () => void; // function to apply the settings
    editableBpm?: boolean; // whether BPM field is editable
    editableFreq?: boolean; // whether frequency field is editable
    showWakeup?: boolean; // currently unused
    isLive?: boolean; // true if form is from real-time data
}

/**
 * A reusable form for entering or reviewing custom heartbeat parameters,
 * including BPM, frequency, amplitude, and a preset label.
 */
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

        {/* BPM Input */}
        <Text style={styles.label}>Target Heart Rate (BPM)</Text>
        <TextInput
            style={[styles.input, !editableBpm && { opacity: 0.6 }]}
            placeholder="e.g. 80"
            keyboardType="numeric"
            value={bpm}
            editable={editableBpm}
            onChangeText={setBpm}
        />

        {/* Frequency Input */}
        <Text style={styles.label}>Vibration Frequency (Hz)</Text>
        <TextInput
            style={[styles.input, !editableFreq && { opacity: 0.6 }]}
            placeholder="e.g. 1.2"
            keyboardType="numeric"
            value={freq}
            editable={editableFreq}
            onChangeText={setFreq}
        />

        {/* Amplitude Picker */}
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

        {/* Label for Saving as Preset */}
        <Text style={styles.label}>Preset Name</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. Realtime Boost"
            value={presetLabel}
            onChangeText={setPresetLabel}
        />

        {/* Submission Button */}
        <PrimaryButton
            label={
                isLive ? 'Activate Live Heartbeat' : 'Activate Custom Heartbeat'
            }
            onPress={onApply}
        />
    </View>
);
