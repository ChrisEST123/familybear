export function validateHeartbeatInput({
    bpm,
    freq,
    amp,
    durationSec,
}: {
    bpm: number;
    freq: number;
    amp: number;
    durationSec: number;
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

    if (isNaN(durationSec)) return 'Duration must be a number.';
    if (durationSec < 1) return 'Duration is too short. Minimum is 1 second.';
    if (durationSec > 120)
        return 'Duration is too long. Maximum is 120 seconds.';

    return null; // All good
}
