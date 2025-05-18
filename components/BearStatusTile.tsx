import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BearStatusTileProps {
    iconName: string; // Icon name from FontAwesome5 (e.g., 'wifi', 'fire')
    label: string; // Title text shown above the value
    value: string; // The actual data value (e.g., "On", "85%", "Disconnected")
    iconColor?: string; // Optional icon color (default = dark gray)
}

/**
 * A reusable visual tile to display status information with an icon, label, and value.
 * Used throughout the app for connection, battery, heat, GPS, etc.
 */
const BearStatusTile: React.FC<BearStatusTileProps> = ({
    iconName,
    label,
    value,
    iconColor = '#333',
}) => {
    return (
        <View style={styles.tile}>
            <FontAwesome5
                name={iconName}
                size={28}
                color={iconColor}
                style={styles.icon}
            />
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

export default BearStatusTile;

// === Styles ===
const styles = StyleSheet.create({
    tile: {
        flexBasis: '48%', // Allows 2 tiles per row with spacing
        maxWidth: '48%',
        backgroundColor: '#fdfdfd',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginBottom: 12,
        alignItems: 'center',

        // Cross-platform shadow
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    icon: {
        fontSize: 28,
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
    },
});
