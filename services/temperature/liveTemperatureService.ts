export const readCurrentTemperature = async (): Promise<number> => {
    // Simulate a one-time temperature reading from a smartwatch
    const mock = 36 + Math.random() * 1.5;
    return parseFloat(mock.toFixed(1));
};
