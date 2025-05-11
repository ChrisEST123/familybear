import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { SOUND_PATTERNS } from '@/constants/soundPatterns';
import { spacing } from '@/constants/spacing';
import { globalStyles } from '@/constants/styles';
import {
    fetchActiveSoundPattern,
    playSoundPattern,
} from '@/services/firebase/sound';

const BearSettingsScreen: React.FC = () => {
    const [selectedPattern, setSelectedPattern] = useState<
        string | undefined
    >();

    useEffect(() => {
        const loadActivePattern = async () => {
            try {
                const active = await fetchActiveSoundPattern();
                if (active) setSelectedPattern(active);
            } catch (err) {
                console.error('Failed to load active sound pattern:', err);
            }
        };

        loadActivePattern();
    }, []);

    const handleSelect = async (pattern: string) => {
        setSelectedPattern(pattern);
        try {
            await playSoundPattern(pattern);
            Alert.alert('Sound Sent', `Bear is now playing ${pattern}`);
        } catch (err) {
            console.error('Error sending sound pattern:', err);
            Alert.alert('Error', 'Failed to play the selected sound.');
        }
    };

    return (
        <View style={[globalStyles.root, styles.container]}>
            <Text style={styles.label}>Choose a Song</Text>

            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedPattern}
                    onValueChange={handleSelect}
                    style={styles.picker}
                >
                    {!selectedPattern && (
                        <Picker.Item
                            label="Select a song..."
                            value={undefined}
                            enabled={false}
                        />
                    )}
                    {SOUND_PATTERNS.map(({ label, value }) => (
                        <Picker.Item key={value} label={label} value={value} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

export default BearSettingsScreen;

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        backgroundColor: colors.background,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textSecondary,
        marginBottom: spacing.sm,
    },
    pickerWrapper: {
        backgroundColor: colors.surface,
        borderRadius: 10,
    },
    picker: {
        height: 48,
        width: '100%',
    },
});
