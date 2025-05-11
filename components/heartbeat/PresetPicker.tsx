import { View, Text } from 'react-native';

import { heartbeatStyles as styles } from './styles';

export const PresetPicker = () => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preset Options</Text>
        <Text style={styles.placeholder}>Preset picker goes here</Text>
    </View>
);
