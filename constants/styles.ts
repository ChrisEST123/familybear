import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';

export const globalStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    alignItems: 'center',
  },
  tileButton: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingVertical: 16,
    marginVertical: 10,
    width: '100%',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
});
