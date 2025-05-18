/**
 * Command to trigger a specific sound pattern on the bear.
 */
export interface SoundCommand {
    pattern: string; // Identifier of the sound to play (e.g., 'merryxmas')
    timestamp: number; // When the command was issued
}

/**
 * Command to start a heartbeat vibration pattern.
 */
export interface HeartbeatCommand {
    beatsPerMinute: number; // Target BPM for the simulated heartbeat
    vibrationFrequencyHz: number; // Frequency of vibration in Hz
    amplitude: number; // Strength of vibration (0.0 to 1.0)
    timestamp: number; // Command issue time
}

/**
 * Command to control the heating pad in the bear.
 */
export interface TemperatureCommand {
    target: number; // Target temperature in °C
    active: boolean; // Whether heating is turned on
    timestamp: number; // When the command was issued
}

/**
 * Force Sensitive Resistor (pickup sensor) status from the bear.
 */
export interface FSRStatus {
    pickedUp: boolean; // True if the bear is currently being held
    value: number; // Raw FSR sensor value
    timestamp: number; // Time of the reading
}

/**
 * GPS location status broadcast by the bear.
 */
export interface GPSStatus {
    lat: number; // Latitude
    lon: number; // Longitude
    timestamp: number; // Time of the reading
}

/**
 * Status object showing which sound was last played and when.
 */
export interface SoundStatus {
    lastPlayed: string; // Identifier of the last played pattern
    playedAt: number; // Timestamp of when it was played
}
