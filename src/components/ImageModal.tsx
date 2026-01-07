import React, { useState, useEffect, useRef, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ProfileImage {
  id: string;
  image: {
    uuid: string;
    contentRating: string;
    width: number;
    height: number;
    blurHash: string;
  };
  accessPermission: string;
  isAd: boolean;
}

interface StartPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX?: number;
  centerY?: number;
}

interface ImageModalProps {
  selectedImage: ProfileImage | null;
  startPosition: StartPosition | null;
  thumbnailUrl: string;
  getImageUrl: (uuid: string, width?: number) => string;
  onClose: () => void;
  onFullResLoaded: (uuid: string, width: number, height: number) => void;
  isFullResAlreadyLoaded: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  selectedImage,
  startPosition,
  thumbnailUrl,
  getImageUrl,
  onClose,
  onFullResLoaded,
  isFullResAlreadyLoaded,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHighRes, setShowHighRes] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [springAnimation, setSpringAnimation] = useState(false);
  const [naturalDimensions, setNaturalDimensions] = useState<{width: number; height: number} | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Initialize modal when image is selected
  useEffect(() => {
    if (selectedImage && startPosition) {
      // Disable body scroll
      document.body.style.overflow = 'hidden';
      
      // Set initial states
      setImageLoaded(isFullResAlreadyLoaded);
      setLoadingProgress(isFullResAlreadyLoaded ? 100 : 5);
      setShowLoadingBar(!isFullResAlreadyLoaded);
      setSpringAnimation(false);
      setShowHighRes(isFullResAlreadyLoaded);

      // Set initial dimensions estimate
      if (!isFullResAlreadyLoaded) {
        const viewportWidth = window.innerWidth * 0.8;
        const viewportHeight = window.innerHeight * 0.8;
        const aspectRatio = startPosition.width / startPosition.height;
        
        let estimatedWidth, estimatedHeight;
        if (aspectRatio > viewportWidth / viewportHeight) {
          estimatedWidth = viewportWidth;
          estimatedHeight = viewportWidth / aspectRatio;
        } else {
          estimatedHeight = viewportHeight;
          estimatedWidth = viewportHeight * aspectRatio;
        }
        
        setNaturalDimensions({
          width: estimatedWidth,
          height: estimatedHeight
        });
      }

      // Start animation
      setTimeout(() => {
        setIsAnimating(true);
        
        if (isFullResAlreadyLoaded) {
          setTimeout(() => setSpringAnimation(true), 300);
          return;
        }

        // Load high-res image
        const highResUrl = getImageUrl(selectedImage.image.uuid, 1500);
        const highResImage = new Image();
        
        highResImage.onload = () => {
          onFullResLoaded(selectedImage.image.uuid, highResImage.naturalWidth, highResImage.naturalHeight);
          
          setNaturalDimensions({
            width: highResImage.naturalWidth,
            height: highResImage.naturalHeight
          });
          
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          
          setLoadingProgress(100);
          
          setTimeout(() => {
            setImageLoaded(true);
            setShowHighRes(true);
            setTimeout(() => setSpringAnimation(true), 200);
            setTimeout(() => setShowLoadingBar(false), 700);
          }, 300);
        };
        
        highResImage.onerror = () => {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          
          setLoadingProgress(100);
          setTimeout(() => {
            setImageLoaded(true);
            setShowHighRes(true);
            setSpringAnimation(true);
            setTimeout(() => setShowLoadingBar(false), 700);
          }, 300);
        };
        
        highResImage.src = highResUrl;
      }, 50);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage, startPosition, isFullResAlreadyLoaded, getImageUrl, onFullResLoaded]);

  const handleClose = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    setShowLoadingBar(false);
    setIsAnimating(false);
    setShowHighRes(false);
    setImageLoaded(false);
    setSpringAnimation(false);
    
    setTimeout(() => {
      setNaturalDimensions(null);
      setLoadingProgress(0);
      onClose();
    }, 250);
  }, [onClose]);

  const handleHighResImageLoad = () => {
    setImageLoaded(true);
    setTimeout(() => setSpringAnimation(true), 50);
  };

  const calculateExpandedDimensions = useCallback(() => {
    if (!startPosition) return null;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = Math.min(50, Math.max(30, viewportWidth * 0.05));
    
    const maxWidth = viewportWidth - (padding * 2);
    const maxHeight = viewportHeight - (padding * 2);
    
    let targetWidth, targetHeight;
    
    if (naturalDimensions && naturalDimensions.width > 0 && naturalDimensions.height > 0) {
      const imageRatio = naturalDimensions.width / naturalDimensions.height;
      const fillFactor = 0.85;
      
      if (imageRatio > maxWidth / maxHeight) {
        targetWidth = maxWidth * fillFactor;
        targetHeight = targetWidth / imageRatio;
      } else {
        targetHeight = maxHeight * fillFactor;
        targetWidth = targetHeight * imageRatio;
      }
    } else {
      const defaultRatio = startPosition.width / startPosition.height;
      targetWidth = maxWidth * 0.85;
      targetHeight = targetWidth / defaultRatio;
      
      if (targetHeight > maxHeight) {
        targetHeight = maxHeight * 0.85;
        targetWidth = targetHeight * defaultRatio;
      }
    }
    
    const centerX = viewportWidth / 2 - targetWidth / 2;
    const centerY = viewportHeight / 2 - targetHeight / 2;
    
    return {
      width: targetWidth,
      height: targetHeight,
      x: centerX,
      y: centerY
    };
  }, [startPosition, naturalDimensions]);

  if (!selectedImage || !startPosition) return null;

  const expandedDimensions = calculateExpandedDimensions();

  return (
    <div
      className={`fixed inset-0 z-50 ${isAnimating ? 'bg-black/90' : 'bg-transparent'} transition-all duration-300 ease-out`}
      onClick={handleClose}
      style={{ 
        pointerEvents: isAnimating ? 'auto' : 'none',
        visibility: isAnimating ? 'visible' : 'hidden'
      }}
    >
      <button
        className={`absolute top-4 right-4 text-white hover:text-gray-300 transition-opacity duration-300 z-[60] ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        style={{ pointerEvents: 'auto' }}
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      
      {/* Loading indicator */}
      {isAnimating && !imageLoaded && showLoadingBar && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 opacity-80">
          <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      {/* Progress Bar */}
      {isAnimating && showLoadingBar && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 md:w-64 z-50">
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg">
            <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[rgb(255,138,128)] to-white rounded-full transition-all duration-200 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="text-center text-white/80 text-xs mt-2 font-medium">
              {loadingProgress < 100 
                ? `Loading image... ${Math.round(loadingProgress)}%` 
                : 'Rendering image...'}
            </div>
          </div>
        </div>
      )}
      
      <div
        className={`fixed will-change-transform ${springAnimation ? 'transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : 'transition-all duration-600 ease-out'}`}
        style={{
          width: isAnimating ? expandedDimensions?.width : startPosition.width,
          height: isAnimating ? expandedDimensions?.height : startPosition.height,
          transform: isAnimating
            ? `translate3d(${expandedDimensions?.x}px, ${expandedDimensions?.y}px, 0) ${springAnimation ? 'scale(1.02)' : 'scale(1)'}`
            : `translate3d(${startPosition.x}px, ${startPosition.y}px, 0)`,
          transformOrigin: 'center',
          boxShadow: isAnimating ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: isAnimating ? 55 : 1,
          transition: isAnimating ? undefined : 'all 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease-out, transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="relative w-full h-full">
            {/* Thumbnail background */}
            <div
              className={`absolute inset-0 rounded-xl overflow-hidden ${springAnimation ? 'transition-opacity duration-700 ease-in-out' : 'transition-opacity duration-200 ease-out'}`}
              style={{
                backgroundImage: `url(${thumbnailUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: showHighRes && imageLoaded ? 0 : 0.9,
                filter: 'blur(0px)',
                transform: 'scale(1.01)',
              }}
            />
            
            {/* High-res image */}
            {(showHighRes || imageLoaded) && (
              <div
                className={`absolute inset-0 rounded-xl overflow-hidden ${springAnimation ? 'transition-opacity duration-700 ease-in-out' : 'transition-opacity duration-200 ease-out'}`}
                style={{
                  opacity: showHighRes && imageLoaded ? 1 : 0,
                  backgroundColor: 'rgba(0,0,0,0.15)',
                }}
              >
                {showHighRes && (
                  <img
                    src={getImageUrl(selectedImage.image.uuid, 1500)}
                    alt="Full resolution preview"
                    className="w-full h-full object-contain"
                    onLoad={handleHighResImageLoad}
                    loading="eager"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
