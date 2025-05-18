import React from 'react';
import { View, Text, Switch, Alert } from 'react-native';

import { heartbeatStyles as styles } from './styles';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import { TimePicker } from '@/components/basic/TimePicker';
import { updateWakeupMode } from '@/services/firebase/wakeUpMode';

interface Props {
    time: Date; // Currently selected wake-up time
    setTime: (v: Date) => void; // Function to update wake-up time
    enabled: boolean; // Whether scheduled wake-up mode is active
    setEnabled: (v: boolean) => void; // Function to toggle wake-up mode
}

/**
 * WakeupScheduler allows users to schedule a specific time for the bear
 * to automatically activate wake-up mode (e.g. buzz/vibrate to wake child).
 */
export const WakeupScheduler: React.FC<Props> = ({
    time,
    setTime,
    enabled,
    setEnabled,
}) => {
    /**
     * Submits the selected time and toggle state to Firebase.
     */
    const handleSubmit = async () => {
        try {
            const hh = time.getHours().toString().padStart(2, '0');
            const mm = time.getMinutes().toString().padStart(2, '0');
            const formatted = `${hh}:${mm}`;

            await updateWakeupMode(formatted, enabled);

            Alert.alert(
                'Schedule Updated',
                `Wake-up at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} is ${enabled ? 'enabled' : 'disabled'}.`
            );
        } catch (err) {
            console.error('Error scheduling wakeup:', err);
            Alert.alert('Error', 'Could not save wake-up schedule.');
        }
    };

    // === UI Rendering ===
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Wake Up Mode Scheduler</Text>

            {/* Toggle to enable or disable scheduled wake-up */}
            <View style={styles.switchRow}>
                <Text style={styles.label}>Enable Scheduled Wakeup</Text>
                <Switch value={enabled} onValueChange={setEnabled} />
            </View>

            {/* Time picker component for choosing the schedule */}
            <TimePicker time={time} setTime={setTime} />

            {/* Submit button to apply schedule */}
            <PrimaryButton label="Set Wake Up Time" onPress={handleSubmit} />
        </View>
    );
};
