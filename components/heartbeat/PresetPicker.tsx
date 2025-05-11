import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';

import { heartbeatStyles as styles } from './styles';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import {
    fetchActiveHeartbeatSetting,
    fetchHeartbeatPresets,
    HeartbeatPreset,
    saveHeartbeatPreset,
} from '@/services/firebase/presets';

export const PresetPicker: React.FC = () => {
    const [presets, setPresets] = useState<HeartbeatPreset[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>();

    useEffect(() => {
        fetchHeartbeatPresets().then(setPresets);
    }, []);

    useEffect(() => {
        const loadPresets = async () => {
            const [presetList, active] = await Promise.all([
                fetchHeartbeatPresets(),
                fetchActiveHeartbeatSetting(),
            ]);

            setPresets(presetList);

            // Only pre-select if the active config matches a known preset
            const match = active && presetList.find((p) => p.id === active.id);
            if (match) {
                setSelectedId(match.id);
            } else {
                setSelectedId(undefined); // fall back to placeholder
            }
        };

        loadPresets();
    }, []);

    const handleApplyPreset = async () => {
        const preset = presets.find((p) => p.id === selectedId);
        if (!preset) return;

        const payload = {
            ...preset,
            timestamp: Date.now(),
        };

        await saveHeartbeatPreset(payload);
        Alert.alert('Preset Applied', `Sent '${preset.label}' to the bear.`);
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select a Preset</Text>

            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedId}
                    onValueChange={(itemValue) => setSelectedId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Choose a preset..." value={undefined} />
                    {presets.map((p) => (
                        <Picker.Item key={p.id} label={p.label} value={p.id} />
                    ))}
                </Picker>
            </View>

            <PrimaryButton
                label="Apply Selected Preset"
                onPress={handleApplyPreset}
            />
        </View>
    );
};
