// Internal state for mock live heart rate listener
let listener: ((bpm: number) => void) | null = null;
let intervalId: number | null = null;

/**
 * Starts a simulated live heart rate stream.
 * Invokes the provided callback every 3 seconds with a random BPM value.
 *
 * @param onData - Callback to receive each simulated heart rate value
 */
export const startHeartRateListener = (onData: (bpm: number) => void): void => {
    listener = onData;

    // Mock live stream — generates a BPM between 60–89 every 3 seconds
    intervalId = setInterval(() => {
        const simulated = 60 + Math.floor(Math.random() * 30); // 60–89 BPM
        if (listener) listener(simulated);
    }, 3000);
};

/**
 * Stops the simulated heart rate stream.
 * Clears the interval and resets the listener.
 */
export const stopHeartRateListener = (): void => {
    if (intervalId) clearInterval(intervalId);
    listener = null;
    intervalId = null;
};

/**
 * Simulates a one-time heart rate reading.
 * Returns a value between 65 and 84 BPM.
 *
 * @returns A Promise resolving to a simulated heart rate
 */
export const readCurrentHeartRate = async (): Promise<number> => {
    return 65 + Math.floor(Math.random() * 20); // 65–84 BPM
};
