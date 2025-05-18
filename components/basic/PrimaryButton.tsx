import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

import { globalStyles } from '@/constants/styles';

interface PrimaryButtonProps {
    label: string; // Text to display inside the button
    onPress: (event: GestureResponderEvent) => void; // Callback for press event
}

/**
 * A reusable primary action button styled using the design system's `tileButton`.
 * Used across the app for actions like submitting forms, navigating, or toggling features.
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    label,
    onPress,
}) => {
    return (
        <TouchableOpacity style={globalStyles.tileButton} onPress={onPress}>
            <Text style={globalStyles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
};

export default PrimaryButton;
