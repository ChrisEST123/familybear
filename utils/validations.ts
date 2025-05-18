/**
 * Validates the user-provided heartbeat parameters.
 * Returns an error message string if validation fails, or null if inputs are valid.
 */
export function validateHeartbeatInput({
    bpm,
    freq,
    amp,
}: {
    bpm: number; // Beats per minute (heart rate)
    freq: number; // Vibration frequency in Hz
    amp: number; // Amplitude (0 to 1 range)
}): string | null {
    // --- Heart rate (BPM) validation ---
    if (isNaN(bpm)) return 'Heart rate must be a number.';
    if (bpm < 30) return 'Heart rate is too low. Minimum is 30 BPM.';
    if (bpm > 180) return 'Heart rate is too high. Maximum is 180 BPM.';

    // --- Frequency validation ---
    if (isNaN(freq)) return 'Frequency must be a number.';
    if (freq < 0.5) return 'Frequency is too low. Minimum is 0.5 Hz.';
    if (freq > 100) return 'Frequency is too high. Maximum is 100 Hz.';

    // --- Amplitude validation ---
    if (isNaN(amp)) return 'Amplitude must be a number.';
    if (amp < 0) return 'Amplitude cannot be negative.';
    if (amp > 1) return 'Amplitude cannot be greater than 1.';

    return null; // All inputs are valid
}
