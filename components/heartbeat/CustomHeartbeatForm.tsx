import { View, TextInput, Switch, Text } from 'react-native';

import { heartbeatStyles as styles } from './styles';
import PrimaryButton from '../basic/PrimaryButton';

interface Props {
    bpm: string;
    setBpm: (v: string) => void;
    freq: string;
    setFreq: (v: string) => void;
    amp: string;
    setAmp: (v: string) => void;
    duration: string;
    setDuration: (v: string) => void;
    wakeupMode: boolean;
    setWakeupMode: (v: boolean) => void;
    onApply: () => void;
    presetLabel: string;
    setPresetLabel: (v: string) => void;
}

export const CustomHeartbeatForm: React.FC<Props> = ({
    bpm,
    setBpm,
    freq,
    setFreq,
    amp,
    setAmp,
    duration,
    setDuration,
    wakeupMode,
    setWakeupMode,
    onApply,
    presetLabel,
    setPresetLabel,
}) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Heartbeat Settings</Text>

        {/* repeat for each input */}
        <Text style={styles.label}>Target Heart Rate (BPM)</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. 80"
            keyboardType="numeric"
            value={bpm}
            onChangeText={setBpm}
        />

        <Text style={styles.label}>Vibration Frequency (Hz)</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. 1.2"
            keyboardType="numeric"
            value={freq}
            onChangeText={setFreq}
        />

        <Text style={styles.label}>Amplitude (0.0 - 1.0)</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. 0.9"
            keyboardType="numeric"
            value={amp}
            onChangeText={setAmp}
        />

        <Text style={styles.label}>Duration (seconds)</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. 60"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
        />

        <Text style={styles.label}>Preset Name</Text>
        <TextInput
            style={styles.input}
            placeholder="e.g. Morning Calm"
            value={presetLabel}
            onChangeText={setPresetLabel}
        />

        <View style={styles.switchRow}>
            <Text style={styles.label}>Enable Wakeup Mode</Text>
            <Switch value={wakeupMode} onValueChange={setWakeupMode} />
        </View>

        <PrimaryButton label="Activate Custom Heartbeat" onPress={onApply} />
    </View>
);
