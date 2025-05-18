import { View } from 'react-native';

import { heartbeatStyles as styles } from './styles';
import PrimaryButton from '../basic/PrimaryButton';

interface Props {
    mode: 'realtime' | 'preset' | 'custom' | 'wakeupmode' | undefined;
    setMode: (m: 'realtime' | 'preset' | 'custom' | 'wakeupmode') => void;
    onUseRealTime: () => void; // Called explicitly for real-time capture flow
}

/**
 * Displays four buttons to let the user choose between different heartbeat control modes:
 * - Real-time (from wearable)
 * - Preset (predefined patterns)
 * - Custom (user-defined values)
 * - Wake-up mode (scheduled vibration)
 */
export const HeartbeatModeSelector: React.FC<Props> = ({
    mode,
    setMode,
    onUseRealTime,
}) => (
    <View style={styles.optionBox}>
        {/* Triggers live heart rate reading and prefills the form */}
        <PrimaryButton
            label="Use Real-Time Heartbeat"
            onPress={onUseRealTime}
        />

        {/* Opens dropdown to select a saved preset */}
        <PrimaryButton label="Use a Preset" onPress={() => setMode('preset')} />

        {/* Opens form for creating a new vibration pattern */}
        <PrimaryButton
            label="Create Custom Pattern"
            onPress={() => setMode('custom')}
        />

        {/* Navigates to scheduler for wake-up trigger mode */}
        <PrimaryButton
            label="Edit Wake Up Mode"
            onPress={() => setMode('wakeupmode')}
        />
    </View>
);
