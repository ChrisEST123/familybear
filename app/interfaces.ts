export interface SoundCommand {
    pattern: string;
    timestamp: number;
  }
  
  export interface HeartbeatCommand {
    beatsPerMinute: number;
    vibrationFrequencyHz: number;
    amplitude: number;
    durationMs: number;
    wakeupMode: boolean;
    timestamp: number;
  }
  
  export interface TemperatureCommand {
    target: number;
    active: boolean;
    timestamp: number;
  }
  
  export interface FSRStatus {
    pickedUp: boolean;
    value: number;
    timestamp: number;
  }
  
  export interface GPSStatus {
    lat: number;
    lon: number;
    timestamp: number;
  }
  
  export interface SoundStatus {
    lastPlayed: string;
    playedAt: number;
  }
  