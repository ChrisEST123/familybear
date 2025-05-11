export function validateHeartbeatInput({
    bpm,
    freq,
    amp,
}: {
    bpm: number;
    freq: number;
    amp: number;
}): string | null {
    if (isNaN(bpm)) return 'Heart rate must be a number.';
    if (bpm < 30) return 'Heart rate is too low. Minimum is 30 BPM.';
    if (bpm > 180) return 'Heart rate is too high. Maximum is 180 BPM.';

    if (isNaN(freq)) return 'Frequency must be a number.';
    if (freq < 0.5) return 'Frequency is too low. Minimum is 0.5 Hz.';
    if (freq > 100) return 'Frequency is too high. Maximum is 100 Hz.';

    if (isNaN(amp)) return 'Amplitude must be a number.';
    if (amp < 0) return 'Amplitude cannot be negative.';
    if (amp > 1) return 'Amplitude cannot be greater than 1.';

    return null; // All good
}
