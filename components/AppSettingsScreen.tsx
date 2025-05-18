import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import CustomToggle from '@/components/basic/CustomToggle';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { globalStyles } from '@/constants/styles';
import {
    fetchNotificationSettings,
    setNotificationSetting,
} from '@/services/watch/sendNotification';

const AppSettingsScreen: React.FC = () => {
    const [settings, setSettings] = useState({
        bearPickup: false,
        geoFenceBreach: false,
        lowBattery: false,
    });

    useEffect(() => {
        const loadSettings = async () => {
            const fetched = await fetchNotificationSettings();
            setSettings((prev) => ({ ...prev, ...fetched }));
        };

        loadSettings();
    }, []);

    const toggle = (key: keyof typeof settings) => {
        const newValue = !settings[key];
        setSettings((prev) => ({ ...prev, [key]: newValue }));
        setNotificationSetting(key, newValue);
    };

    return (
        <ScrollView style={[globalStyles.root, styles.container]}>
            <CustomToggle
                label="Bear Pickup alerts"
                value={settings.bearPickup}
                onToggle={() => toggle('bearPickup')}
            />
            <CustomToggle
                label="Safe Zone alerts"
                value={settings.geoFenceBreach}
                onToggle={() => toggle('geoFenceBreach')}
            />
            <CustomToggle
                label="Low Battery alerts"
                value={settings.lowBattery}
                onToggle={() => toggle('lowBattery')}
            />
        </ScrollView>
    );
};

export default AppSettingsScreen;

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        backgroundColor: colors.background,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
});
