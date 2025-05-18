import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export const heartbeatStyles = StyleSheet.create({
    /**
     * Container for grouping mode options like buttons or pickers.
     */
    optionBox: {
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },

    /**
     * General section block with top margin to separate logical groups.
     */
    section: {
        marginTop: spacing.lg,
    },

    /**
     * Section heading text styling.
     */
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: spacing.md,
        color: colors.textPrimary,
    },

    /**
     * Label styling for form inputs or switches.
     */
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textSecondary,
        marginTop: spacing.sm,
    },

    /**
     * TextInput styling for numerical and label fields.
     */
    input: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: spacing.sm,
        marginTop: 4,
    },

    /**
     * Used when no input is selected or populated; visually distinct.
     */
    placeholder: {
        fontStyle: 'italic',
        color: colors.textSecondary,
        paddingVertical: spacing.sm,
    },

    /**
     * Used to align a switch and its label horizontally.
     */
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },

    /**
     * Wrapper style for dropdowns (e.g., Picker components).
     */
    pickerWrapper: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        marginBottom: spacing.md,
    },

    /**
     * Styling for the native Picker itself.
     */
    picker: {
        color: colors.textPrimary,
        fontSize: 16,
        height: 60,
        width: '100%',
    },
});
