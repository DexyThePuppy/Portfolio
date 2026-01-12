import { useState, useEffect, useRef, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { ProfileImage } from '../types/index';

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
  
  // Refs
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotationResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClosingRef = useRef(false);
  const loadTokenRef = useRef(0);
  
  // Calculate expanded dimensions to fit screen
  const calculateExpandedDimensions = useCallback(() => {
    if (!imageDimensions) return null;
    
    const padding = 80;
    const maxWidth = window.innerWidth - padding * 2;
    const maxHeight = window.innerHeight - padding * 2;
    
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
    setRotation(initialRotation);
    
    // Drop-in effect: scale down then bounce back
    setScale(0.95);
    setTimeout(() => setScale(1), 100);

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
    };
  }, [selectedImage, initialRotation, openNonce]);

  const handleMediumLoaded = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    // Ignore stale loads across rapid switches
    const token = loadTokenRef.current;
    // Touch token to ensure handler sees latest (no-op, just clarity)
    void token;

    const img = e.currentTarget;
    setMediumResLoaded(true);
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  }, []);

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
    }, 200);
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
    setScale(0.95); // Scale down when closing
    
    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    
    // Wait for animation to complete, then notify parent
    closeTimeoutRef.current = setTimeout(() => {
      isClosingRef.current = false;
      setIsClosing(false);
      onClose();
      closeTimeoutRef.current = null;
    }, 300);
  }, [onClose]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
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
      className={`fixed inset-0 z-50 transition-colors duration-300 ${
        isOpen && !isClosing ? 'bg-black/90' : 'bg-transparent'
      }`}
      onClick={handleClose}
      style={{
        pointerEvents: isClosingRef.current ? 'none' : 'auto',
      }}
    >
      {/* Close button */}
      <button
        className={`absolute top-4 right-4 z-[60] text-white hover:text-gray-300 transition-opacity duration-300 ${
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        aria-label="Close"
        style={{
          pointerEvents: isClosingRef.current ? 'none' : 'auto',
        }}
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      
      {/* Loading indicator */}
      {showLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[70] pointer-events-none">
          <div className="flex flex-col items-center gap-4 bg-black/50 backdrop-blur-sm rounded-2xl px-6 py-4">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-white text-sm font-medium">
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
          zIndex: 55,
          willChange: 'transform',
          backgroundColor: 'rgba(0,0,0,0.2)',
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1), height 400ms cubic-bezier(0.4, 0, 0.2, 1), left 400ms cubic-bezier(0.4, 0, 0.2, 1), top 400ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
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
        
        {/* Medium-res (1000px - loads fast, good quality) */}
        <img
          key={`medium-${selectedImage.image.uuid}-${openNonce}`}
          src={getImageUrl(selectedImage.image.uuid, 1000)}
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
        
        {/* High-res (2000px - best quality) */}
        <img
          key={`high-${selectedImage.image.uuid}-${openNonce}`}
          src={getImageUrl(selectedImage.image.uuid, 2000)}
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
