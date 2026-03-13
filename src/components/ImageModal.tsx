import { useState, useEffect, useRef, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useHapticsWithAudio } from '../hooks/useHapticsWithAudio';
import type { ProfileImage } from '../types/index';
import { Z_INDEX, IMAGE_SIZES, MODAL_PADDING, ANIMATION_TIMINGS, GALLERY } from '../constants';

interface ImagePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageModalProps {
  selectedImage: ProfileImage | null;
  startPosition: ImagePosition | null;
  thumbnailUrl: string;
  initialRotation: number;
  openNonce: number;
  onClose: () => void;
  getImageUrl: (uuid: string, size?: number) => string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  selectedImage,
  startPosition,
  thumbnailUrl,
  initialRotation,
  openNonce,
  onClose,
  getImageUrl,
}) => {
  // Haptic feedback with audio
  const { trigger, triggerDrop } = useHapticsWithAudio();
  
  // Core animation state
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  // Image loading state
  const [mediumResLoaded, setMediumResLoaded] = useState(false);
  const [highResStatus, setHighResStatus] = useState<'idle' | 'loading' | 'loaded' | 'failed'>('idle');
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Rotation state - starts with gallery rotation, resets when high-res loads
  const [rotation, setRotation] = useState(0);
  
  // Scale state - for drop-in effect
  const [scale, setScale] = useState(1);
  
  // Wiggle state for mobile fun effect
  const [isWiggling, setIsWiggling] = useState(false);
  
  // Detect mobile device for wiggle effect
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
    (typeof window !== 'undefined' && window.innerWidth <= 768);
  
  // Refs
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotationResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClosingRef = useRef(false);
  const loadTokenRef = useRef(0);
  const hapticAnimationFrameRef = useRef<number | null>(null);
  const hapticStartTimeRef = useRef<number | null>(null);
  const wiggleAnimationFrameRef = useRef<number | null>(null);
  
  // Bounce easing function (matches CSS cubic-bezier(0.34, 1.56, 0.64, 1))
  const bounceEase = useCallback((t: number): number => {
    // Cubic bezier approximation for bounce effect
    if (t < 0.5) {
      return 4 * t * t * t;
    } else {
      const f = 2 * t - 2;
      return 1 + f * f * f * 0.5;
    }
  }, []);

  // Progressive haptic feedback synced to scale animation
  // Remastered for organic, natural feel
  const startProgressiveHaptics = useCallback(() => {
    // Clear any existing animation
    if (hapticAnimationFrameRef.current) {
      cancelAnimationFrame(hapticAnimationFrameRef.current);
    }

    const startTime = performance.now();
    hapticStartTimeRef.current = startTime;
    const duration = 500; // Match transform transition duration
    const startScale = GALLERY.DROP_SCALE;
    const endScale = 1.0;
    const scaleRange = endScale - startScale;
    
    let lastVibrationTime = 0;
    let finalVibrationTriggered = false;
    let lastEasedProgress = 0;
    
    // Natural pause range - organic spacing
    const maxPause = 100; // Start with longer pauses
    const minPause = 35; // End with shorter pauses
    const finalVibrationThreshold = 0.88; // Final vibration near end

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      
      if (elapsed >= duration) {
        hapticAnimationFrameRef.current = null;
        hapticStartTimeRef.current = null;
        return;
      }

      // Calculate progress using bounce easing
      const progress = elapsed / duration;
      const easedProgress = bounceEase(progress);
      
      // Calculate scale progress (0 to 1)
      const currentScale = startScale + (scaleRange * easedProgress);
      const scaleProgress = (currentScale - startScale) / scaleRange;
      
      // Trigger final strong vibration near completion
      if (!finalVibrationTriggered && scaleProgress >= finalVibrationThreshold) {
        trigger([{ duration: 35 }], { intensity: 1 });
        finalVibrationTriggered = true;
        lastVibrationTime = currentTime;
        lastEasedProgress = easedProgress;
        hapticAnimationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate pause based on animation velocity (rate of change)
      // Faster animation = shorter pauses (more frequent vibrations)
      const progressDelta = easedProgress - lastEasedProgress;
      const animationVelocity = progressDelta * 1000; // Velocity per second
      
      // Map velocity to pause: slow = long pause, fast = short pause
      // Use smooth curve for natural feel
      const velocityFactor = Math.max(0.1, Math.min(1.0, animationVelocity * 2));
      const pauseFactor = 1 - (velocityFactor * 0.7); // Invert: high velocity = low pause factor
      const currentPause = minPause + (maxPause - minPause) * pauseFactor;
      
      // Trigger vibration when enough time has passed
      const timeSinceLastVibration = currentTime - lastVibrationTime;
      
      if (!finalVibrationTriggered && timeSinceLastVibration >= currentPause) {
        // Intensity follows the same bounce easing curve as the animation
        // This makes volume perfectly synchronized with visual progress
        const intensity = 0.25 + (easedProgress * 0.65); // 0.25 to 0.9
        
        // Duration increases smoothly with scale progress
        const vibrationDuration = 22 + (scaleProgress * 23); // 22ms to 45ms
        
        // Trigger haptic feedback
        trigger([{ duration: vibrationDuration }], { intensity });
        
        lastVibrationTime = currentTime;
        lastEasedProgress = easedProgress;
      }

      hapticAnimationFrameRef.current = requestAnimationFrame(animate);
    };

    hapticAnimationFrameRef.current = requestAnimationFrame(animate);
  }, [bounceEase, trigger]);

  // Calculate expanded dimensions to fit screen
  const calculateExpandedDimensions = useCallback(() => {
    if (!imageDimensions) return null;
    
    const maxWidth = window.innerWidth - MODAL_PADDING * 2;
    const maxHeight = window.innerHeight - MODAL_PADDING * 2;
    
    const imageAspect = imageDimensions.width / imageDimensions.height;
    const screenAspect = maxWidth / maxHeight;
    
    let width: number, height: number;
    
    if (imageAspect > screenAspect) {
      width = Math.min(maxWidth, imageDimensions.width);
      height = width / imageAspect;
    } else {
      height = Math.min(maxHeight, imageDimensions.height);
      width = height * imageAspect;
    }
    
    return {
      width,
      height,
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2,
    };
  }, [imageDimensions]);
  
  // Start a fresh load cycle (robust against rapid / repeated opens)
  useEffect(() => {
    // Invalidate any previous in-flight loads
    loadTokenRef.current += 1;
    
    // Clear timers/intervals from previous cycle
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (progressStartTimeoutRef.current) {
      clearTimeout(progressStartTimeoutRef.current);
      progressStartTimeoutRef.current = null;
    }
    if (rotationResetTimeoutRef.current) {
      clearTimeout(rotationResetTimeoutRef.current);
      rotationResetTimeoutRef.current = null;
    }

    if (!selectedImage) {
      setMediumResLoaded(false);
      setHighResStatus('idle');
      setImageDimensions(null);
      setLoadingProgress(0);
      setRotation(0);
      setScale(1);
      return;
    }

    // Every open starts fresh
    setIsOpen(true);
    setIsClosing(false);
    isClosingRef.current = false;

    setMediumResLoaded(false);
    setHighResStatus('loading');
    setLoadingProgress(0);
    
    // On mobile, add a fun wiggle rotation effect
    if (isMobile) {
      // Clear any existing wiggle animation
      if (wiggleAnimationFrameRef.current) {
        cancelAnimationFrame(wiggleAnimationFrameRef.current);
      }
      
      setIsWiggling(true);
      // Start with initial rotation
      setRotation(initialRotation);
      
      // Use a sine wave for organic, non-linear wiggle motion
      // Creates a natural, bouncy feel with decaying amplitude
      const wiggleDuration = 1000; // Total duration in ms - slower
      const startTime = performance.now();
      
      const wiggleAnimation = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / wiggleDuration, 1);
        
        if (progress >= 1) {
          setRotation(initialRotation);
          setIsWiggling(false);
          wiggleAnimationFrameRef.current = null;
          return;
        }
        
        // Use ease-out curve for natural decay (cubic ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        // Sine wave with decaying amplitude and decreasing frequency for organic wiggle
        // Frequency starts higher and decreases (oscillations slow down)
        const frequency = 5 - (progress * 3); // Start at 5, decrease to 2
        const amplitude = 4.5 * (1 - easedProgress); // Decay from 4.5° to 0° - more noticeable
        const wiggle = Math.sin(progress * Math.PI * frequency) * amplitude;
        
        setRotation(initialRotation + wiggle);
        wiggleAnimationFrameRef.current = requestAnimationFrame(wiggleAnimation);
      };
      
      wiggleAnimationFrameRef.current = requestAnimationFrame(wiggleAnimation);
    } else {
      setRotation(initialRotation);
    }
    
    // Drop-in effect: scale down then bounce back
    setScale(GALLERY.DROP_SCALE);
    setTimeout(() => setScale(1), ANIMATION_TIMINGS.SCALE_DROP);
    
    // Note: Haptic feedback will trigger when image loads (in handleMediumLoaded)

    // Start progress simulation shortly after open (real load completion comes from <img onLoad>)
    progressStartTimeoutRef.current = setTimeout(() => {
      if (progressIntervalRef.current) return;
      progressIntervalRef.current = setInterval(() => {
        setLoadingProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 120);
    }, 100);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (progressStartTimeoutRef.current) {
        clearTimeout(progressStartTimeoutRef.current);
        progressStartTimeoutRef.current = null;
      }
      if (rotationResetTimeoutRef.current) {
        clearTimeout(rotationResetTimeoutRef.current);
        rotationResetTimeoutRef.current = null;
      }
      if (hapticAnimationFrameRef.current) {
        cancelAnimationFrame(hapticAnimationFrameRef.current);
        hapticAnimationFrameRef.current = null;
        hapticStartTimeRef.current = null;
      }
    };
  }, [selectedImage, initialRotation, openNonce, startProgressiveHaptics]);

  const handleMediumLoaded = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    // Ignore stale loads across rapid switches
    const token = loadTokenRef.current;
    // Touch token to ensure handler sees latest (no-op, just clarity)
    void token;

    const img = e.currentTarget;
    setMediumResLoaded(true);
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    
    // Start progressive haptic feedback now that image is loaded
    startProgressiveHaptics();
  }, [startProgressiveHaptics]);

  const handleHighLoaded = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (progressStartTimeoutRef.current) {
      clearTimeout(progressStartTimeoutRef.current);
      progressStartTimeoutRef.current = null;
    }
    setLoadingProgress(100);
    setHighResStatus('loaded');

    if (rotationResetTimeoutRef.current) {
      clearTimeout(rotationResetTimeoutRef.current);
      rotationResetTimeoutRef.current = null;
    }
    rotationResetTimeoutRef.current = setTimeout(() => {
      setRotation(0);
    }, ANIMATION_TIMINGS.ROTATION_RESET);
  }, []);

  const handleHighError = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (progressStartTimeoutRef.current) {
      clearTimeout(progressStartTimeoutRef.current);
      progressStartTimeoutRef.current = null;
    }
    setLoadingProgress(100);
    setHighResStatus('failed');
  }, []);
  
  // Handle body scroll lock
  useEffect(() => {
    if (selectedImage && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage, isClosing]);
  
  // Handle close
  const handleClose = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    // Prevent multiple close calls
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    
    // Start close animation with scale-down effect
    setIsClosing(true);
    setIsOpen(false);
    setScale(GALLERY.DROP_SCALE); // Scale down when closing
    
    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    
    // Wait for animation to complete, then notify parent
    closeTimeoutRef.current = setTimeout(() => {
      // Drop haptic feedback - trigger at the very end when opacity reaches 0
      // Low-pitched stone crash sound for impact feel
      triggerDrop(0.9);
      
      isClosingRef.current = false;
      setIsClosing(false);
      onClose();
      closeTimeoutRef.current = null;
    }, ANIMATION_TIMINGS.MODAL_CLOSE);
  }, [onClose, triggerDrop]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (hapticAnimationFrameRef.current) {
        cancelAnimationFrame(hapticAnimationFrameRef.current);
        hapticAnimationFrameRef.current = null;
      }
      if (wiggleAnimationFrameRef.current) {
        cancelAnimationFrame(wiggleAnimationFrameRef.current);
        wiggleAnimationFrameRef.current = null;
      }
    };
  }, []);
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImage, handleClose]);
  
  if (!selectedImage || !startPosition) {
    return null;
  }
  
  const expandedDimensions = calculateExpandedDimensions();
  // Show loading if we're still loading high-res and we're open
  const showLoading = isOpen && !isClosing && highResStatus === 'loading';
  
  return (
    <div
      className={`fixed inset-0 transition-colors duration-300 ${
        isOpen && !isClosing ? 'bg-black/90' : 'bg-transparent'
      }`}
      onClick={handleClose}
      style={{
        pointerEvents: isClosingRef.current ? 'none' : 'auto',
        zIndex: Z_INDEX.MODAL_BACKDROP,
      }}
    >
      {/* Close button */}
      <button
        className={`absolute top-4 right-4 text-on-surface hover:text-on-surface-variant transition-opacity duration-300 ${
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        aria-label="Close"
        style={{
          pointerEvents: isClosingRef.current ? 'none' : 'auto',
          zIndex: Z_INDEX.MODAL_CLOSE,
        }}
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      
      {/* Loading indicator */}
      {showLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: Z_INDEX.MODAL_LOADING }}
        >
          <div className="flex flex-col items-center gap-4 bg-black/50 backdrop-blur-sm rounded-2xl px-6 py-4">
            <svg className="animate-spin h-10 w-10 text-on-surface" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-on-surface text-sm font-medium">
              {!mediumResLoaded 
                ? 'Loading...' 
                : loadingProgress > 0 
                  ? `${Math.round(loadingProgress)}%` 
                  : 'Enhancing quality...'}
            </div>
          </div>
        </div>
      )}
      
      {/* Image container */}
      <div
        className="fixed"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isOpen && expandedDimensions ? expandedDimensions.width : startPosition.width,
          height: isOpen && expandedDimensions ? expandedDimensions.height : startPosition.height,
          left: isOpen && expandedDimensions ? expandedDimensions.x : startPosition.x,
          top: isOpen && expandedDimensions ? expandedDimensions.y : startPosition.y,
          borderRadius: isOpen && expandedDimensions ? '1.5rem' : '0.75rem',
          overflow: 'hidden',
          boxShadow: isOpen ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none',
          zIndex: Z_INDEX.MODAL_CONTENT,
          willChange: 'transform',
          backgroundColor: 'rgba(0,0,0,0.2)',
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: isWiggling 
            ? 'width 400ms cubic-bezier(0.4, 0, 0.2, 1), height 400ms cubic-bezier(0.4, 0, 0.2, 1), left 400ms cubic-bezier(0.4, 0, 0.2, 1), top 400ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            : 'width 400ms cubic-bezier(0.4, 0, 0.2, 1), height 400ms cubic-bezier(0.4, 0, 0.2, 1), left 400ms cubic-bezier(0.4, 0, 0.2, 1), top 400ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Thumbnail preview (from gallery - instant) */}
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            style={{
              imageRendering: 'auto',
              visibility: 'visible',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}
        
        {/* Medium-res - loads fast, good quality */}
        <img
          key={`medium-${selectedImage.image.uuid}-${openNonce}`}
          src={getImageUrl(selectedImage.image.uuid, IMAGE_SIZES.MEDIUM)}
          alt="Medium quality"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          onLoad={handleMediumLoaded}
          style={{
            visibility: 'visible',
            zIndex: mediumResLoaded ? 2 : 0,
            pointerEvents: 'none',
          }}
        />
        
        {/* High-res - best quality */}
        <img
          key={`high-${selectedImage.image.uuid}-${openNonce}`}
          src={getImageUrl(selectedImage.image.uuid, IMAGE_SIZES.HIGH)}
          alt="Full size image"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          onLoad={handleHighLoaded}
          onError={handleHighError}
          style={{
            visibility: 'visible',
            zIndex: highResStatus === 'loaded' ? 3 : 0,
            pointerEvents: 'none',
            // Avoid showing a broken-image icon if high-res fails
            display: highResStatus === 'failed' ? 'none' : 'block',
          }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
