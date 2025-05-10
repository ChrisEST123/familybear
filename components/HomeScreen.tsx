import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import BearStatusTileWrapper from './BearStatusTileWrapper';
import { globalStyles } from '@/constants/styles';
import { PrimaryButton } from '@/components/basic/PrimaryButton';

const HomeScreen: React.FC = () => {
  const [heartbeatPreset, setHeartbeatPreset] = useState({
    key: 'preRecorded1',
    label: 'PreRecorded1',
  });

  const handleChangeHeartbeat = () => {
    console.log('[Action] Change Heartbeat Setting');
  };

  const handleWakeupMode = () => {
    console.log('[Action] Wake Up Mode Settings');
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={styles.statusGrid}>
        <BearStatusTileWrapper type="connection" value={true} />
        <BearStatusTileWrapper type="battery" value={82} />
        <BearStatusTileWrapper type="vibration" value={false} />
        <BearStatusTileWrapper type="heartbeat" value={heartbeatPreset.label} />
      </View>

      <PrimaryButton label="Change Heartbeat Setting" onPress={handleChangeHeartbeat} />
      <PrimaryButton label="Wake Up Mode Settings" onPress={handleWakeupMode} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
});
