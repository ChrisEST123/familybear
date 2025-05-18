/**
 * Simulates a one-time temperature reading from a smartwatch.
 * Returns a random value between 36.0°C and 37.5°C to mimic body temperature.
 *
 * @returns A Promise resolving to a mock temperature value (1 decimal place)
 */
export const readCurrentTemperature = async (): Promise<number> => {
    const mock = 36 + Math.random() * 1.5; // Random temp between 36.0 and 37.5
    return parseFloat(mock.toFixed(1)); // Round to 1 decimal place
};
