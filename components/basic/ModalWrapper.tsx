import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
} from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface ModalWrapperProps {
    visible: boolean;
    onConfirm: (e: GestureResponderEvent) => void;
    onCancel: (e: GestureResponderEvent) => void;
    confirmLabel?: string;
    cancelLabel?: string;
    message: string;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
    visible,
    onConfirm,
    onCancel,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    message,
}) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={onConfirm}
                    >
                        <Text style={styles.buttonText}>{confirmLabel}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onCancel}
                    >
                        <Text style={styles.buttonText}>{cancelLabel}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    box: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.lg,
        width: '100%',
        alignItems: 'center',
        gap: spacing.md,
    },
    message: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textPrimary,
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        width: '100%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F44336',
        borderRadius: 10,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
});
