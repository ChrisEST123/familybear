import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';

import { heartbeatStyles as styles } from './styles';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import {
    fetchActiveHeartbeatSetting,
    fetchHeartbeatPresets,
    HeartbeatPreset,
    activateHeartbeatPreset,
} from '@/services/firebase/presets';

export const PresetPicker: React.FC = () => {
    const [presets, setPresets] = useState<HeartbeatPreset[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>();

    // Fetch all saved presets once on mount
    useEffect(() => {
        fetchHeartbeatPresets().then(setPresets);
    }, []);

    // Fetch presets and current active heartbeat setting to highlight selection
    useEffect(() => {
        const loadPresets = async () => {
            const [presetList, active] = await Promise.all([
                fetchHeartbeatPresets(),
                fetchActiveHeartbeatSetting(),
            ]);

            setPresets(presetList);

            // Highlight the active one if it matches a preset
            const match = active && presetList.find((p) => p.id === active.id);
            if (match) {
                setSelectedId(match.id);
            } else {
                setSelectedId(undefined);
            }
        };

        loadPresets();
    }, []);

    /**
     * Applies the selected preset by sending its parameters to the bear.
     */
    const handleApplyPreset = async () => {
        const preset = presets.find((p) => p.id === selectedId);
        if (!preset) return;

        const payload = {
            ...preset,
            timestamp: Date.now(), // Ensure freshness
        };

        await activateHeartbeatPreset(payload);
        Alert.alert('Preset Applied', `Sent '${preset.label}' to the bear.`);
    };

    // === UI Rendering ===
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select a Preset</Text>

            {/* Dropdown Picker */}
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedId}
                    onValueChange={(itemValue) => setSelectedId(itemValue)}
                    style={styles.picker}
                >
                    {/* Placeholder shown only if no valid selection */}
                    {presets.length === 0 || !selectedId ? (
                        <Picker.Item
                            label="Choose a preset..."
                            value={undefined}
                            enabled={false}
                        />
                    ) : null}

                    {/* List all available presets */}
                    {presets.map((p) => (
                        <Picker.Item key={p.id} label={p.label} value={p.id} />
                    ))}
                </Picker>
            </View>

            {/* Apply button */}
            <PrimaryButton
                label="Apply Selected Preset"
                onPress={handleApplyPreset}
            />
        </View>
    );
};
