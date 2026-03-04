import { useCallback, useEffect } from 'react';
import { useWebHaptics } from 'web-haptics/react';
import { playAudioHaptic, playAudioHapticPreset, playDropHaptic, getAudioHaptics } from '../utils/audioHaptics';

/**
 * Custom hook that combines web-haptics with audio feedback
 * Provides haptic feedback with audio fallback/supplement
 */
export function useHapticsWithAudio() {
  const { trigger: webHapticsTrigger } = useWebHaptics();

  // Initialize audio eagerly on mount (will be activated on first user interaction)
  useEffect(() => {
    const initAudio = async () => {
      // Try to initialize audio context immediately
      try {
        await getAudioHaptics().ensureAudio();
      } catch (error) {
        // If immediate init fails, wait for user interaction
        const handleInteraction = async () => {
          try {
            await getAudioHaptics().ensureAudio();
          } catch (e) {
            console.debug('Audio initialization failed:', e);
          }
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('keydown', handleInteraction);
        };

        document.addEventListener('click', handleInteraction, { once: true });
        document.addEventListener('touchstart', handleInteraction, { once: true });
        document.addEventListener('keydown', handleInteraction, { once: true });
      }
    };

    initAudio();
  }, []);

  /**
   * Trigger haptic feedback with audio
   * Audio always plays regardless of vibration availability
   * @param preset - Preset name or custom pattern
   * @param options - Options including intensity
   */
  const trigger = useCallback(
    async (
      preset?: string | Array<{ delay?: number; duration: number; intensity?: number }>,
      options?: { intensity?: number }
    ) => {
      // Always play audio feedback first (ensures it plays even if vibration fails)
      try {
        if (typeof preset === 'string') {
          // Preset name
          await playAudioHapticPreset(preset);
        } else if (options?.intensity !== undefined) {
          // Custom pattern with intensity option
          await playAudioHaptic(options.intensity);
        } else if (Array.isArray(preset) && preset.length > 0) {
          // Custom pattern array - use first item's intensity or default
          const intensity = preset[0]?.intensity ?? 0.5;
          await playAudioHaptic(intensity);
        } else {
          // Default medium intensity
          await playAudioHaptic(0.5);
        }
      } catch (error) {
        // Try to initialize audio if it failed, then retry
        try {
          await getAudioHaptics().ensureAudio();
          // Retry playing audio
          if (typeof preset === 'string') {
            await playAudioHapticPreset(preset);
          } else {
            const intensity = options?.intensity ?? (Array.isArray(preset) && preset[0]?.intensity) ?? 0.5;
            await playAudioHaptic(intensity);
          }
        } catch (retryError) {
          // If audio still fails, log but don't throw - vibration will still work
          console.debug('Audio haptic feedback unavailable:', retryError);
        }
      }

      // Also trigger web-haptics vibration (if available)
      try {
        webHapticsTrigger(preset as any, options as any);
      } catch (error) {
        // Vibration failed, but audio already played
        console.debug('Vibration haptic feedback unavailable:', error);
      }
    },
    [webHapticsTrigger]
  );

  /**
   * Trigger drop haptic feedback (low-pitched stone crash sound)
   * @param intensity - Intensity from 0 to 1 (default: 1.0 for maximum volume)
   */
  const triggerDrop = useCallback(
    async (intensity: number = 1.0) => {
      // Play low-pitched drop sound (only once)
      try {
        await playDropHaptic(intensity);
      } catch (error) {
        // Only retry once if initialization failed
        try {
          await getAudioHaptics().ensureAudio();
          await playDropHaptic(intensity);
        } catch (retryError) {
          console.debug('Drop haptic audio unavailable:', retryError);
        }
      }

      // Also trigger vibration
      try {
        webHapticsTrigger([
          { duration: 30 },
          { delay: 10, duration: 40 }
        ], { intensity });
      } catch (error) {
        console.debug('Drop vibration unavailable:', error);
      }
    },
    [webHapticsTrigger]
  );

  return { trigger, triggerDrop };
}
