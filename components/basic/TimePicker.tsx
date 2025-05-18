import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View, Platform } from 'react-native';

import PrimaryButton from './PrimaryButton';

interface Props {
    time: Date; // Currently selected time
    setTime: (t: Date) => void; // Callback to update selected time
}

/**
 * A reusable time-only picker component using native `DateTimePicker`.
 * Optimized for cross-platform handling (iOS stays open, Android closes on select).
 */
export const TimePicker: React.FC<Props> = ({ time, setTime }) => {
    const [show, setShow] = useState(false); // Controls visibility of picker

    /**
     * Handles time selection from the picker.
     * iOS keeps the picker open; Android closes it on selection.
     */
    const onChange = (_: any, selected?: Date) => {
        setShow(Platform.OS === 'ios'); // only hide on Android
        if (selected) setTime(selected);
    };

    // Format selected time as HH:MM for button label
    const label = `${time.getHours().toString().padStart(2, '0')}:${time
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

    // === UI Rendering ===
    return (
        <View>
            <PrimaryButton
                label={`Select Time (${label})`}
                onPress={() => setShow(true)}
            />
            {show && (
                <DateTimePicker
                    mode="time"
                    value={time}
                    is24Hour
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};
