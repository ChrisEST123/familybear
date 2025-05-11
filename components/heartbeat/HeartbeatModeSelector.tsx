import { View } from 'react-native';

import { heartbeatStyles as styles } from './styles';
import PrimaryButton from '../basic/PrimaryButton';

interface Props {
    mode: 'realtime' | 'preset' | 'custom' | undefined;
    setMode: (m: 'realtime' | 'preset' | 'custom') => void;
    onUseRealTime: () => void;
}

export const HeartbeatModeSelector: React.FC<Props> = ({
    mode,
    setMode,
    onUseRealTime,
}) => (
    <View style={styles.optionBox}>
        <PrimaryButton
            label="Use Real-Time Heartbeat"
            onPress={onUseRealTime}
        />
        <PrimaryButton label="Use a Preset" onPress={() => setMode('preset')} />
        <PrimaryButton
            label="Create Custom Pattern"
            onPress={() => setMode('custom')}
        />
    </View>
);
