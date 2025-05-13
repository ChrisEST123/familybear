import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View, Platform } from 'react-native';

import PrimaryButton from './PrimaryButton';

interface Props {
    time: Date;
    setTime: (t: Date) => void;
}

export const TimePicker: React.FC<Props> = ({ time, setTime }) => {
    const [show, setShow] = useState(false);

    const onChange = (_: any, selected?: Date) => {
        setShow(Platform.OS === 'ios');
        if (selected) setTime(selected);
    };

    const label = `${time.getHours().toString().padStart(2, '0')}:${time
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

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
