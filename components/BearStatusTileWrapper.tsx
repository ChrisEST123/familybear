import React from 'react';

import BearStatusTile from './BearStatusTile';

// Defines all accepted status tile types
interface BearStatusTileWrapperProps {
    type:
        | 'connection'
        | 'battery'
        | 'vibration'
        | 'heartbeat'
        | 'wakeupMode'
        | 'gps'
        | 'geoFence'
        | 'heat'
        | 'temperature';
    value: string | number | boolean;
}

/**
 * Maps each status `type` to a consistent icon, label, and color scheme.
 * Delegates rendering to `BearStatusTile` component with formatted value.
 */
const BearStatusTileWrapper: React.FC<BearStatusTileWrapperProps> = ({
    type,
    value,
}) => {
    let iconName = '';
    let label = '';
    let iconColor = '#333';
    let displayValue = String(value); // Default fallback

    switch (type) {
        // Connection status (WiFi)
        case 'connection':
            iconName = 'wifi';
            label = 'Connection';
            const isConnected = value === true || value === 'Connected';
            iconColor = isConnected ? '#4CAF50' : '#F44336';
            displayValue = isConnected ? 'Connected' : 'Offline';
            break;

        // Battery percentage
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

        // Vibration mode status
        case 'vibration':
            iconName = 'heartbeat';
            label = 'Vibration';
            const isVibrating = value === true || value === 'On';
            iconColor = isVibrating ? '#E91E63' : '#999';
            displayValue = isVibrating ? 'On' : 'Off';
            break;

        // Active heartbeat preset label
        case 'heartbeat':
            iconName = 'heart';
            label = 'Heartbeat Pattern';
            iconColor = '#9C27B0';
            displayValue = String(value);
            break;

        // Wake-up mode activation + time
        case 'wakeupMode':
            iconName = 'bell';
            label = 'Wake Up Mode';
            const stringVal = String(value);
            iconColor = stringVal.includes('Active') ? '#FFC107' : '#999';
            displayValue = stringVal;
            break;

        // GPS tracking status
        case 'gps':
            iconName = 'location-arrow';
            label = 'GPS';
            const gpsOn = value === true || value === 'On';
            iconColor = gpsOn ? '#4CAF50' : '#999';
            displayValue = gpsOn ? 'On' : 'Off';
            break;

        // Safe zone geofence status
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

        // Heating mode status
        case 'heat':
            iconName = 'fire';
            label = 'Heat Mode';
            iconColor = value === 'On' ? '#FF5722' : '#999';
            displayValue = value === 'On' ? 'On' : 'Off';
            break;

        // Current target or live temperature
        case 'temperature':
            iconName = 'thermometer-half';
            label = 'Temperature';
            iconColor = '#03A9F4';
            displayValue =
                typeof value === 'number'
                    ? `${value.toFixed(1)}°C`
                    : String(value);
            break;

        // Fallback handler
        default:
            label = 'Status';
            iconName = 'question';
            displayValue = String(value);
    }

    // Render the base tile component with calculated props
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
