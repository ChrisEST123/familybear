let listener: ((bpm: number) => void) | null = null;
let intervalId: number | null = null;

export const startHeartRateListener = (onData: (bpm: number) => void): void => {
    listener = onData;

    // Mock live stream — update every 3s
    intervalId = setInterval(() => {
        const simulated = 60 + Math.floor(Math.random() * 30);
        if (listener) listener(simulated);
    }, 3000);
};

export const stopHeartRateListener = (): void => {
    if (intervalId) clearInterval(intervalId);
    listener = null;
    intervalId = null;
};

export const readCurrentHeartRate = async (): Promise<number> => {
    // Simulate a one-time heart rate reading
    return 65 + Math.floor(Math.random() * 20);
};
