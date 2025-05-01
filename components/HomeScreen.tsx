import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BearStatusTileWrapper from './BearStatusTileWrapper';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

const HomeScreen: React.FC = () => {
  const [fsrStatus, setFsrStatus] = useState("connected");
  const [gpsStatus, setGpsStatus] = useState("65/70");

  const handleCommand = (type: string) => {
    console.log(`[MOCK] Executed ${type}`);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'FamilyBear Dashboard' }} />
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.statusGrid}>
          <BearStatusTileWrapper type="connection" value={true} />
          <BearStatusTileWrapper type="battery" value={82} />
          <BearStatusTileWrapper type="vibration" value={false} />
        </View>

        <TouchableOpacity style={styles.tileButton} onPress={() => handleCommand("bearControl")}>
          <Text style={styles.buttonText}>Bear Control Panel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tileButton} onPress={() => handleCommand("appSettings")}>
          <Text style={styles.buttonText}>App Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tileButton} onPress={() => handleCommand("bearSettings")}>
          <Text style={styles.buttonText}>Bear Settings</Text>
        </TouchableOpacity>

      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    marginVertical: 4,
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
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
});
