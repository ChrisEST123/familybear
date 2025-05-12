import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';

import { PrimaryButton } from '@/components/basic/PrimaryButton';
import { colors } from '@/constants/colors';
import { SOUND_PATTERNS } from '@/constants/soundPatterns';
import { spacing } from '@/constants/spacing';
import { globalStyles } from '@/constants/styles';
import {
    fetchActiveSoundPattern,
    playSoundPattern,
} from '@/services/firebase/sound';
import {
    loadWatchNotificationImage,
    uploadWatchNotificationImage,
} from '@/services/firebase/watchImageUpload';

const BearSettingsScreen: React.FC = () => {
    const [selectedPattern, setSelectedPattern] = useState<
        string | undefined
    >();
    const [imageUri, setImageUri] = useState<string | null>(null);

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

    useEffect(() => {
        const loadExistingImage = async () => {
            try {
                const uri = await loadWatchNotificationImage();
                if (uri) {
                    setImageUri(uri);
                }
            } catch (err) {
                console.error('Failed to load image from Firebase:', err);
            }
        };

        loadExistingImage();
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

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
            base64: false,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileName = uri.split('/').pop()!;
            const destUri = `${FileSystem.documentDirectory}${fileName}`;

            try {
                await FileSystem.copyAsync({ from: uri, to: destUri });

                const uploadedUrl = await uploadWatchNotificationImage(destUri);

                setImageUri(uploadedUrl);

                Alert.alert(
                    'Image Uploaded',
                    'Image is ready for watch notifications.'
                );
            } catch (err) {
                console.error('Failed to copy or upload image:', err);
                Alert.alert('Error', 'Could not store the image.');
            }
        }
    };

    return (
        <View style={[globalStyles.root, styles.container]}>
            <Text style={styles.label}>Image for Watch Notification</Text>
            <View style={styles.imagePickerContainer}>
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.previewImage}
                    />
                ) : (
                    <Text style={styles.placeholder}>No image selected</Text>
                )}
                <PrimaryButton label="Choose Image" onPress={handlePickImage} />
            </View>

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
        height: 60,
        width: '100%',
    },
    imagePickerContainer: {
        marginTop: spacing.lg,
        gap: spacing.sm,
    },
    previewImage: {
        width: 180,
        height: 180,
        borderRadius: 10,
        resizeMode: 'cover',
        backgroundColor: '#ccc',
    },
    placeholder: {
        fontStyle: 'italic',
        color: colors.textSecondary,
    },
});
