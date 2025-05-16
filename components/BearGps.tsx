import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';

import BearStatusTileWrapper from './BearStatusTileWrapper';
import PrimaryButton from './basic/PrimaryButton';

import { globalStyles } from '@/constants/styles';
import { setGpsEnabled } from '@/services/firebase/gps';
import {
    subscribeToGpsEnabled,
    subscribeToBearGpsData,
} from '@/services/firebase/subscribers';

const BearGps: React.FC = () => {
    const [gpsEnabled, setGpsEnabledState] = useState(false);
    const [gpsData, setGpsData] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [geoFenceStatus, setGeoFenceStatus] = useState<boolean | 'unknown'>(
        'unknown'
    );

    useEffect(() => {
        const unsubGps = subscribeToGpsEnabled(setGpsEnabledState);
        let unsubGpsData: () => void;

        if (gpsEnabled) {
            unsubGpsData = subscribeToBearGpsData((data) => {
                setGpsData(data);

                if ('geoFence' in data && typeof data.geoFence === 'boolean') {
                    setGeoFenceStatus(data.geoFence); // true or false
                } else {
                    setGeoFenceStatus('unknown');
                }
            });
        } else {
            setGpsData(null);
            setGeoFenceStatus('unknown');
        }

        return () => {
            unsubGps?.();
            unsubGpsData?.();
        };
    }, [gpsEnabled]);

    const toggleGps = () => {
        setGpsEnabled(!gpsEnabled).catch(() =>
            Alert.alert('Error', 'Failed to update GPS status')
        );
    };

    const openInMaps = () => {
        if (!gpsData) return;
        const { latitude, longitude } = gpsData;
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    return (
        <View style={globalStyles.root}>
            <View style={styles.statusGrid}>
                <BearStatusTileWrapper type="gps" value={gpsEnabled} />
                <BearStatusTileWrapper type="geoFence" value={geoFenceStatus} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>GPS Enabled</Text>
                <Switch value={gpsEnabled} onValueChange={toggleGps} />
            </View>

            <View style={styles.gpsInfo}>
                {gpsEnabled ? (
                    gpsData ? (
                        <PrimaryButton
                            label="View in Google Maps"
                            onPress={openInMaps}
                        />
                    ) : (
                        <Text style={styles.loading}>
                            Waiting for GPS data...
                        </Text>
                    )
                ) : (
                    <Text style={styles.loading}>
                        GPS is currently turned off
                    </Text>
                )}
            </View>
        </View>
    );
};

export default BearGps;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 24,
    },
    label: {
        fontSize: 16,
    },
    gpsInfo: {
        paddingHorizontal: 24,
        gap: 12,
    },
    coords: {
        fontSize: 14,
    },
    loading: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 12,
    },
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 24,
        marginBottom: 12,
        gap: 12,
        marginTop: 24,
    },
});
