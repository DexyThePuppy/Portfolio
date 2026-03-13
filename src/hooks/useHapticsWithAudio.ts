import { useCallback, useEffect } from 'react';
import { useWebHaptics } from 'web-haptics/react';
import { playAudioHaptic, playAudioHapticPreset, playDropHaptic, getAudioHaptics } from '../utils/audioHaptics';

/** iOS: Vibration API unsupported; audio is the primary feedback. */
const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

/** iPad on iOS 13+ can report as Mac; check maxTouchPoints */
const isIPad = typeof navigator !== 'undefined'
  && navigator.platform === 'MacIntel'
  && navigator.maxTouchPoints > 1;

let audioUnlockAttached = false;
/** Unlock AudioContext on first user interaction. iOS: touchend. Mac: mousedown/click. */
function useAudioUnlock() {
  useEffect(() => {
    if (audioUnlockAttached) return;
    audioUnlockAttached = true;
    const unlock = () => {
      getAudioHaptics().tryResumeSync();
    return () => document.removeEventListener('touchend', unlock);
      getAudioHaptics().ensureAudio().catch(() => {});
    };
    if (isIOS || isIPad) {
      document.addEventListener('touchend', unlock, { once: true, passive: true });
    } else {
      document.addEventListener('mousedown', unlock, { once: true, passive: true });
      document.addEventListener('click', unlock, { once: true, passive: true });
    }
  }, []);
}

/**
 * Custom hook that combines web-haptics with audio feedback
 * On iOS: audio-only (Vibration API not supported). AudioContext created/resumed on first user gesture.
 */
export function useHapticsWithAudio() {
  const { trigger: webHapticsTrigger } = useWebHaptics();
  useAudioUnlock();

  // Initialize audio eagerly on mount (will be activated on first user interaction)
  useEffect(() => {
    const initAudio = async () => {
      try {
        await getAudioHaptics().ensureAudio();
      } catch {
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
      // iOS: resume AudioContext synchronously while still in user gesture stack
      getAudioHaptics().tryResumeSync();

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
            const intensity = options?.intensity ?? (Array.isArray(preset) ? preset[0]?.intensity : undefined) ?? 0.5;
            await playAudioHaptic(intensity);
          }
        } catch (retryError) {
          // If audio still fails, log but don't throw - vibration will still work
          console.debug('Audio haptic feedback unavailable:', retryError);
        }
      }

      // Trigger web-haptics vibration (skip on iOS – Vibration API unsupported)
      if (!isIOS) {
        try {
          webHapticsTrigger(preset as any, options as any);
        } catch (error) {
          console.debug('Vibration haptic feedback unavailable:', error);
        }
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
      getAudioHaptics().tryResumeSync();
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

      if (!isIOS) {
        try {
          webHapticsTrigger([
            { duration: 30 },
            { delay: 10, duration: 40 }
          ], { intensity });
        } catch (error) {
          console.debug('Drop vibration unavailable:', error);
        }
      }
    },
    [webHapticsTrigger]
  );

  return { trigger, triggerDrop };
}
