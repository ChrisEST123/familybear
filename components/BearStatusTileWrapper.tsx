import React from 'react';

import BearStatusTile from './BearStatusTile';

interface BearStatusTileWrapperProps {
    type: 'connection' | 'battery' | 'vibration' | 'heartbeat' | 'wakeupMode';
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
            const isWakeup = value === true || value === 'On';
            iconColor = isWakeup ? '#FFC107' : '#999';
            displayValue = isWakeup ? 'Enabled' : 'Disabled';
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
