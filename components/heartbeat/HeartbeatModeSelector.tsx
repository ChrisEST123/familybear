import { View } from 'react-native';

import { heartbeatStyles as styles } from './styles';

import PrimaryButton from '@/components/basic/PrimaryButton';

interface Props {
    mode: 'realtime' | 'preset' | 'custom' | undefined;
    setMode: (m: 'realtime' | 'preset' | 'custom') => void;
}

export const HeartbeatModeSelector: React.FC<Props> = ({ mode, setMode }) => (
    <View style={styles.optionBox}>
        <PrimaryButton
            label="Use Real-Time Heartbeat"
            onPress={() => setMode('realtime')}
        />
        <PrimaryButton label="Use a Preset" onPress={() => setMode('preset')} />
        <PrimaryButton
            label="Create Custom Pattern"
            onPress={() => setMode('custom')}
        />
    </View>
);
