import React from 'react';

import BearStatusTile from './BearStatusTile';

interface BearStatusTileWrapperProps {
    type:
        | 'connection'
        | 'battery'
        | 'vibration'
        | 'heartbeat'
        | 'wakeupMode'
        | 'gps'
        | 'geoFence';
    value: string | number | boolean;
}

const BearStatusTileWrapper: React.FC<BearStatusTileWrapperProps> = ({
    type,
    value,
}) => {
    let iconName = '';
    let label = '';
    let iconColor = '#333';
    let displayValue = String(value);

    switch (type) {
        case 'connection':
            iconName = 'wifi';
            label = 'Connection';
            const isConnected = value === true || value === 'Connected';
            iconColor = isConnected ? '#4CAF50' : '#F44336';
            displayValue = isConnected ? 'Connected' : 'Offline';
            break;

        case 'battery':
            iconName = 'battery-half';
            label = 'Battery';

            const battery =
                typeof value === 'number'
                    ? value
                    : parseInt(value as string, 10);

            if (battery >= 80) iconColor = '#4CAF50';
            else if (battery >= 40) iconColor = '#FFC107';
            else if (battery >= 20) iconColor = '#FF9800';
            else iconColor = '#F44336';

            displayValue = `${battery}%`;
            break;

        case 'vibration':
            iconName = 'heartbeat';
            label = 'Vibration';
            const isVibrating = value === true || value === 'On';
            iconColor = isVibrating ? '#E91E63' : '#999';
            displayValue = isVibrating ? 'On' : 'Off';
            break;

        case 'heartbeat':
            iconName = 'heart';
            label = 'Heartbeat Pattern';
            iconColor = '#9C27B0';
            displayValue = String(value);
            break;

        case 'wakeupMode':
            iconName = 'bell';
            label = 'Wake Up Mode';

            const stringVal = String(value);
            iconColor = stringVal.includes('Active') ? '#FFC107' : '#999';
            displayValue = stringVal;
            break;

        case 'gps':
            iconName = 'location-arrow';
            label = 'GPS';
            const gpsOn = value === true || value === 'On';
            iconColor = gpsOn ? '#4CAF50' : '#999';
            displayValue = gpsOn ? 'On' : 'Off';
            break;

        case 'geoFence':
            iconName = 'shield-alt';
            label = 'Safe Zone';

            if (value === 'inside' || value === true) {
                iconColor = '#4CAF50';
                displayValue = 'In Safe Zone';
            } else if (value === 'outside' || value === false) {
                iconColor = '#F44336';
                displayValue = 'Outside Zone';
            } else {
                iconColor = '#999';
                displayValue = 'Unknown';
            }
            break;

        default:
            label = 'Status';
            iconName = 'question';
            displayValue = String(value);
    }

    return (
        <BearStatusTile
            iconName={iconName}
            label={label}
            value={displayValue}
            iconColor={iconColor}
        />
    );
};

export default BearStatusTileWrapper;
