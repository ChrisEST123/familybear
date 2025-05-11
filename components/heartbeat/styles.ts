import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export const heartbeatStyles = StyleSheet.create({
    optionBox: {
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    section: {
        marginTop: spacing.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: spacing.md,
        color: colors.textPrimary,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textSecondary,
        marginTop: spacing.sm,
    },
    input: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: spacing.sm,
        marginTop: 4,
    },
    placeholder: {
        fontStyle: 'italic',
        color: colors.textSecondary,
        paddingVertical: spacing.sm,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
});
