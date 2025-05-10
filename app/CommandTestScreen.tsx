import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import { ref, set, get } from 'firebase/database';
import { db } from '../firebase';
import {
  SoundCommand, HeartbeatCommand, TemperatureCommand,
  FSRStatus, GPSStatus, SoundStatus
} from '../components/interfaces';

const CommandTestScreen: React.FC = () => {
  const [fsr, setFsr] = useState<FSRStatus | null>(null);
  const [gps, setGps] = useState<GPSStatus | null>(null);
  const [soundStatus, setSoundStatus] = useState<SoundStatus | null>(null);

  // Writers
  const playSoundPattern = (pattern: string) => {
    const soundData: SoundCommand = {
      pattern,
      timestamp: Date.now()
    };
    set(ref(db, '/commands/sound'), soundData);
  };

  const setTemperature = (value: number) => {
    const tempData: TemperatureCommand = {
      target: value,
      active: true,
      timestamp: Date.now()
    };
    set(ref(db, '/commands/temperature'), tempData);
  };

  const startHeartbeat = () => {
    const heartbeatData: HeartbeatCommand = {
      beatsPerMinute: 80,
      vibrationFrequencyHz: 1.2,
      amplitude: 0.9,
      durationMs: 60000,
      wakeupMode: false,
      timestamp: Date.now()
    };
    set(ref(db, '/commands/heartbeat'), heartbeatData);
  };

  // Readers
  const readFSR = async () => {
    const snapshot = await get(ref(db, '/status/fsr'));
    if (snapshot.exists()) {
      setFsr(snapshot.val() as FSRStatus);
    } else {
      Alert.alert('FSR Status', 'No data found.');
    }
  };

  const readGPS = async () => {
    const snapshot = await get(ref(db, '/status/gps'));
    if (snapshot.exists()) {
      setGps(snapshot.val() as GPSStatus);
    } else {
      Alert.alert('GPS Status', 'No data found.');
    }
  };

  const readSoundStatus = async () => {
    const snapshot = await get(ref(db, '/status/sound'));
    if (snapshot.exists()) {
      setSoundStatus(snapshot.val() as SoundStatus);
    } else {
      Alert.alert('Sound Status', 'No data found.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="🔊 Play Heartbeat1" onPress={() => playSoundPattern('heartbeat1')} />
      <Button title="📢 Play Alert Sound" onPress={() => playSoundPattern('alert')} />
      <Button title="🔥 Set Temperature to 36.5" onPress={() => setTemperature(36.5)} />
      <Button title="💓 Start Heartbeat Mode" onPress={startHeartbeat} />

      <Button title="📥 Read FSR Status" onPress={readFSR} />
      <Button title="🛰️ Read GPS" onPress={readGPS} />
      <Button title="📡 Read Last Played Sound" onPress={readSoundStatus} />

      {fsr && (
        <Text>FSR: pickedUp={fsr.pickedUp ? 'Yes' : 'No'}, value={fsr.value}</Text>
      )}
      {gps && (
        <Text>GPS: lat={gps.lat}, lon={gps.lon}</Text>
      )}
      {soundStatus && (
        <Text>Sound: lastPlayed={soundStatus.lastPlayed}</Text>
      )}
    </View>
  );
};

export default CommandTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  }
});
