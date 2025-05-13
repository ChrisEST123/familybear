import React from 'react';
import { View, Text, Switch, Alert } from 'react-native';

import { heartbeatStyles as styles } from './styles';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import { TimePicker } from '@/components/basic/TimePicker';
import { updateWakeupMode } from '@/services/firebase/wakeUpMode';

interface Props {
    time: Date;
    setTime: (v: Date) => void;
    enabled: boolean;
    setEnabled: (v: boolean) => void;
}

export const WakeupScheduler: React.FC<Props> = ({
    time,
    setTime,
    enabled,
    setEnabled,
}) => {
    const handleSubmit = async () => {
        try {
            const hh = time.getHours().toString().padStart(2, '0');
            const mm = time.getMinutes().toString().padStart(2, '0');
            const formatted = `${hh}:${mm}`;

            await updateWakeupMode(formatted, enabled);

            Alert.alert(
                'Schedule Updated',
                `Wake-up at ${time} is ${enabled ? 'enabled' : 'disabled'}.`
            );
        } catch (err) {
            console.error('Error scheduling wakeup:', err);
            Alert.alert('Error', 'Could not save wake-up schedule.');
        }
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Wake Up Mode Scheduler</Text>

            <View style={styles.switchRow}>
                <Text style={styles.label}>Enable Scheduled Wakeup</Text>
                <Switch value={enabled} onValueChange={setEnabled} />
            </View>

            <TimePicker time={time} setTime={setTime} />

            <PrimaryButton label="Set Wake Up Time" onPress={handleSubmit} />
        </View>
    );
};
