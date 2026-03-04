/**
 * Audio haptic feedback utility
 * Creates fake haptic sounds using Web Audio API when vibration is not available
 * Based on web-haptics library implementation
 */

class AudioHaptics {
  private audioCtx: AudioContext | null = null;
  private audioFilter: BiquadFilterNode | null = null;
  private audioGain: GainNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private initialized = false;
  private clickCount = 0; // Track clicks for pattern variation
  private whooshAudioBuffer: AudioBuffer | null = null;
  private whooshAudioLoading = false;

  /**
   * Initialize audio context and nodes
   */
  async ensureAudio(): Promise<void> {
    if (this.initialized || typeof AudioContext === 'undefined') {
      return;
    }

    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.audioFilter = this.audioCtx.createBiquadFilter();
      this.audioFilter.type = 'bandpass';
      this.audioFilter.frequency.value = 4000; // 4kHz center frequency
      this.audioFilter.Q.value = 8; // Quality factor

      this.audioGain = this.audioCtx.createGain();
      this.audioFilter.connect(this.audioGain);
      this.audioGain.connect(this.audioCtx.destination);

      // Create 4ms audio buffer
      const duration = 0.004;
      this.audioBuffer = this.audioCtx.createBuffer(
        1,
        this.audioCtx.sampleRate * duration,
        this.audioCtx.sampleRate
      );

      // Fill buffer with decaying random noise
      const channelData = this.audioBuffer.getChannelData(0);
      for (let i = 0; i < channelData.length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / 25);
      }
    }

    // Resume audio context if suspended (required for user interaction)
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    this.initialized = true;
  }

  /**
   * Play a click sound with specified intensity and Animal Crossing-style pitch variations
   * @param intensity - Intensity value from 0 to 1
   * @param pitchMultiplier - Optional pitch multiplier (1.0 = normal, <1.0 = lower pitch, >1.0 = higher pitch)
   */
  playClick(intensity: number = 0.5, pitchMultiplier: number = 1.0): void {
    // Try to ensure audio is initialized if not already
    if (!this.audioCtx || !this.audioFilter || !this.audioGain || !this.audioBuffer) {
      // Try to initialize synchronously if possible
      if (typeof AudioContext !== 'undefined' && !this.audioCtx) {
        try {
          this.audioCtx = new AudioContext();
          this.audioFilter = this.audioCtx.createBiquadFilter();
          this.audioFilter.type = 'bandpass';
          this.audioFilter.frequency.value = 4000;
          this.audioFilter.Q.value = 8;

          this.audioGain = this.audioCtx.createGain();
          this.audioFilter.connect(this.audioGain);
          this.audioGain.connect(this.audioCtx.destination);

          const duration = 0.004;
          this.audioBuffer = this.audioCtx.createBuffer(
            1,
            this.audioCtx.sampleRate * duration,
            this.audioCtx.sampleRate
          );

          const channelData = this.audioBuffer.getChannelData(0);
          for (let i = 0; i < channelData.length; i++) {
            channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / 25);
          }
        } catch (error) {
          console.debug('Failed to initialize audio context:', error);
          return;
        }
      } else {
        return;
      }
    }

    // For low-pitched sounds (drop/crash), use longer buffer for more substantial feel
    const isLowPitch = pitchMultiplier < 1.0;
    let bufferToUse = this.audioBuffer;
    
    if (isLowPitch && this.audioCtx) {
      // Create a much longer buffer for drop sounds (20ms for substantial crash)
      const dropDuration = 0.020;
      const dropBuffer = this.audioCtx.createBuffer(
        1,
        this.audioCtx.sampleRate * dropDuration,
        this.audioCtx.sampleRate
      );
      const dropChannelData = dropBuffer.getChannelData(0);
      for (let i = 0; i < dropChannelData.length; i++) {
        // Much slower decay for deep, rumbling, sustained crash sound
        // Higher amplitude for louder drop sound
        dropChannelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / 60) * 1.5;
      }
      bufferToUse = dropBuffer;
    } else {
      // Regenerate buffer with new random noise for each click
      // Increase amplitude for louder sound
      const channelData = this.audioBuffer.getChannelData(0);
      for (let i = 0; i < channelData.length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / 25) * 1.3;
      }
    }

    // Set gain based on intensity
    // 5x volume for all sounds
    if (isLowPitch) {
      // 5x volume for drop sounds
      this.audioGain.gain.value = 5.0 * intensity; // 5x volume for drop sounds
    } else {
      // 5x volume for normal sounds
      this.audioGain.gain.value = 5.0 * intensity; // 5x volume (0 to 5.0 max)
    }

    // ===== REMASTERED PITCH SYSTEM =====
    // Natural, organic pitch variations based on smooth curves and harmonic relationships
    
    let finalFreq: number;
    let filterQ: number;
    let playbackRate: number;
    
    if (pitchMultiplier < 1.0) {
      // Low-pitched sounds (drop/crash) - Deep, rumbling, with random pitch variation
      // Base frequency follows intensity with smooth curve
      const intensityCurve = Math.pow(intensity, 0.85); // Slight ease-out for natural feel
      const baseFreq = 180 + intensityCurve * 520; // 180Hz to 700Hz (more natural range)
      
      // Random pitch variation (±25% for more variety)
      const randomPitchVariation = 1 + (Math.random() - 0.5) * 0.5;
      finalFreq = baseFreq * pitchMultiplier * randomPitchVariation;
      
      // Random filter resonance for deep sounds
      filterQ = 5.5 + Math.random() * 3.0; // 5.5 to 8.5 (random range)
      
      // Random playback rate for depth variation
      playbackRate = 0.65 + Math.random() * 0.15; // 65-80% speed (more random)
      
      finalFreq = Math.max(120, Math.min(900, finalFreq));
    } else {
      // Normal sounds - More random pitch variation
      // Base frequency uses smooth intensity curve
      const intensityCurve = Math.pow(intensity, 0.75); // Ease-out for natural progression
      const baseFreq = 1400 + intensityCurve * 2400; // 1400Hz to 3800Hz (natural range)
      
      // Random pitch variation (±30% for more variety and fun)
      const randomPitchVariation = 1 + (Math.random() - 0.5) * 0.6;
      finalFreq = baseFreq * randomPitchVariation;
      
      // Random filter resonance
      filterQ = 6.0 + Math.random() * 4.0; // 6.0 to 10.0 (random range)
      
      // Random playback rate variation (±5% for more character)
      playbackRate = 0.95 + Math.random() * 0.1; // 95-105% speed
      
      finalFreq = Math.max(900, Math.min(5500, finalFreq));
    }
    
    // Apply calculated values
    this.audioFilter.frequency.value = finalFreq;
    this.audioFilter.Q.value = filterQ;
    
    // Increment click counter for pattern variation
    this.clickCount++;

    // Create and play buffer source with natural pitch variation
    const source = this.audioCtx.createBufferSource();
    source.buffer = bufferToUse;
    source.playbackRate.value = playbackRate;
    
    source.connect(this.audioFilter);
    source.onended = () => source.disconnect();
    source.start();
  }

  /**
   * Load whoosh audio buffer
   */
  private async loadWhooshBuffer(): Promise<void> {
    if (this.whooshAudioBuffer || this.whooshAudioLoading) {
      return;
    }

    if (!this.audioCtx) {
      await this.ensureAudio();
      if (!this.audioCtx) {
        throw new Error('Audio context not available');
      }
    }

    this.whooshAudioLoading = true;
    try {
      const response = await fetch('/woosh.wav');
      const arrayBuffer = await response.arrayBuffer();
      this.whooshAudioBuffer = await this.audioCtx!.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.debug('Failed to load whoosh sound:', error);
      throw error;
    } finally {
      this.whooshAudioLoading = false;
    }
  }

  /**
   * Play whoosh sound from audio file with random pitch variation using Web Audio API
   * @param volume - Volume from 0 to 1 (default: 1.0)
   */
  async playWhoosh(volume: number = 1.0): Promise<void> {
    try {
      // Ensure audio context is initialized
      await this.ensureAudio();
      if (!this.audioCtx) {
        console.debug('Audio context not available for whoosh');
        return;
      }

      // Load whoosh buffer if not already loaded
      if (!this.whooshAudioBuffer) {
        try {
          await this.loadWhooshBuffer();
        } catch (error) {
          console.debug('Whoosh sound loading failed:', error);
          return;
        }
      }

      if (!this.whooshAudioBuffer) {
        console.debug('Whoosh buffer not available');
        return;
      }

      // Create gain node for volume control
      const gainNode = this.audioCtx.createGain();
      gainNode.gain.value = Math.min(1.0, volume);
      gainNode.connect(this.audioCtx.destination);

      // Create buffer source with random pitch variation
      const source = this.audioCtx.createBufferSource();
      source.buffer = this.whooshAudioBuffer;
      
      // Random pitch variation using playbackRate - wide range including deep tones
      // playbackRate > 1.0 = higher pitch, < 1.0 = lower pitch (deeper tone)
      // Range from 60% (deep) to 130% (high) for maximum variety
      const randomPitch = 0.6 + Math.random() * 0.7; // 60% to 130% speed (wide pitch variation)
      source.playbackRate.value = randomPitch;
      
      source.connect(gainNode);
      source.onended = () => {
        source.disconnect();
        gainNode.disconnect();
      };
      
      source.start(0);
    } catch (error) {
      console.debug('Whoosh sound unavailable:', error);
    }
  }

  /**
   * Cleanup audio resources
   */
  cleanup(): void {
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
      this.audioFilter = null;
      this.audioGain = null;
      this.audioBuffer = null;
      this.initialized = false;
    }
    this.whooshAudioBuffer = null;
    this.whooshAudioLoading = false;
  }
}

// Singleton instance
let audioHapticsInstance: AudioHaptics | null = null;

/**
 * Get or create the audio haptics instance
 */
export function getAudioHaptics(): AudioHaptics {
  if (!audioHapticsInstance) {
    audioHapticsInstance = new AudioHaptics();
  }
  return audioHapticsInstance;
}

/**
 * Play audio haptic feedback
 * @param intensity - Intensity from 0 to 1 (default: 0.5)
 * @param pitchMultiplier - Optional pitch multiplier (1.0 = normal, <1.0 = lower pitch, >1.0 = higher pitch)
 */
export async function playAudioHaptic(intensity: number = 0.5, pitchMultiplier: number = 1.0): Promise<void> {
  const audioHaptics = getAudioHaptics();
  await audioHaptics.ensureAudio();
  audioHaptics.playClick(intensity, pitchMultiplier);
}

/**
 * Play a low-pitched drop/crash sound (like a stone crashing)
 * @param intensity - Intensity from 0 to 1 (default: 1.0 for maximum volume)
 */
export async function playDropHaptic(intensity: number = 1.0): Promise<void> {
  const audioHaptics = getAudioHaptics();
  await audioHaptics.ensureAudio();
  // Use 0.4 pitch multiplier for deep, low-pitched stone crash sound
  // Single, longer sound instead of multiple pulses to avoid double-play
  audioHaptics.playClick(intensity, 0.4);
}

/**
 * Play whoosh sound for fullscreen animation
 * @param volume - Volume from 0 to 1 (default: 1.0)
 */
export async function playWhooshSound(volume: number = 1.0): Promise<void> {
  const audioHaptics = getAudioHaptics();
  await audioHaptics.playWhoosh(volume);
}

/**
 * Map haptic preset names to intensity values
 */
const PRESET_INTENSITIES: Record<string, number> = {
  light: 0.3,
  medium: 0.5,
  heavy: 0.8,
  soft: 0.2,
  rigid: 0.7,
  success: 0.6,
  warning: 0.5,
  error: 0.7,
  selection: 0.4,
  nudge: 0.3,
  buzz: 0.6,
};

/**
 * Play audio haptic based on preset name
 * @param preset - Preset name (light, medium, heavy, etc.)
 */
export async function playAudioHapticPreset(preset: string): Promise<void> {
  const intensity = PRESET_INTENSITIES[preset] || 0.5;
  await playAudioHaptic(intensity);
}
