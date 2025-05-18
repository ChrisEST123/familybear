import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface Props {
    value: boolean;
    onToggle: () => void;
    label: string;
}

const CustomToggle: React.FC<Props> = ({ value, onToggle, label }) => {
    return (
        <Pressable onPress={onToggle} style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.box, value ? styles.on : styles.off]}>
                <Text style={styles.state}>{value ? 'ON' : 'OFF'}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    box: {
        width: 60,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    on: {
        backgroundColor: '#4CAF50',
    },
    off: {
        backgroundColor: '#ccc',
    },
    state: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CustomToggle;
