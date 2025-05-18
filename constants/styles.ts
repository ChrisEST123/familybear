import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { spacing } from './spacing';

export const globalStyles = StyleSheet.create({
    /**
     * Root style for wrapping screens — ensures full height and consistent background.
     */
    root: {
        flex: 1,
        backgroundColor: colors.background,
    },

    /**
     * General-purpose scroll container with padding and center alignment.
     * Use with ScrollView or FlatList using `contentContainerStyle`.
     */
    container: {
        flexGrow: 1,
        padding: spacing.lg,
        backgroundColor: colors.background,
        alignItems: 'center',
    },

    /**
     * Tile-like button used throughout the app for large touchable areas.
     */
    tileButton: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        paddingVertical: 16,
        marginVertical: 10,
        width: '100%',
        elevation: 1, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        alignItems: 'center',
    },

    /**
     * Button label styling for tile buttons and consistent call-to-actions.
     */
    buttonText: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },

    /**
     * Shadow styling reusable across cards, tiles, or elevated surfaces.
     */
    cardShadow: {
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1,
    },
});
