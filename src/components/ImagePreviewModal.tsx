import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ProfileImage } from '../types';

interface ImagePreviewModalProps {
  selectedImage: ProfileImage;
  startPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  isAnimating: boolean;
  imageLoaded: boolean;
  showLoadingBar: boolean;
  loadingProgress: number;
  springAnimation: boolean;
  showHighRes: boolean;
  thumbnailUrl: string;
  calculateExpandedDimensions: () => { width: number; height: number; x: number; y: number; } | null;
  onClose: (e?: React.MouseEvent) => void;
  getModifiedImageUrl: (uuid: string, size: number) => string;
  onHighResImageLoad: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = React.memo(({
  selectedImage,
  startPosition,
  isAnimating,
  imageLoaded,
  showLoadingBar,
  loadingProgress,
  springAnimation,
  showHighRes,
  thumbnailUrl,
  calculateExpandedDimensions,
  onClose,
  getModifiedImageUrl,
  onHighResImageLoad
}) => {
  const expandedDimensions = React.useMemo(() => 
    isAnimating ? calculateExpandedDimensions() : null,
    [isAnimating, calculateExpandedDimensions]
  );

  const imageContainerStyle = {
    width: expandedDimensions?.width ?? startPosition.width,
    height: expandedDimensions?.height ?? startPosition.height,
    left: expandedDimensions?.x ?? startPosition.x,
    top: expandedDimensions?.y ?? startPosition.y,
    transform: springAnimation ? 'scale(1.02)' : 'scale(1)',
    transformOrigin: 'center',
    boxShadow: isAnimating ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none',
    overflow: 'hidden',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 55,
    transitionProperty: 'width, height, left, top, transform, box-shadow, background-color',
    transitionDuration: springAnimation ? '500ms' : isAnimating ? '450ms' : '250ms',
    transitionTimingFunction: springAnimation 
      ? 'cubic-bezier(0.25, 1, 0.33, 1)' 
      : isAnimating 
        ? 'cubic-bezier(0.22, 1, 0.36, 1)' 
        : 'cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'width, height, left, top, transform',
    backfaceVisibility: 'hidden',
  };

  const LoadingSpinner = () => (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 opacity-80">
      <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  const handleCloseClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(e);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isAnimating ? 'bg-black/90' : 'bg-transparent'} transition-all duration-300 ease-out`}
      onClick={onClose}
      style={{ 
        pointerEvents: isAnimating ? 'auto' : 'none',
        visibility: isAnimating ? 'visible' : 'hidden'
      }}
    >
      <button
        className={`absolute top-4 right-4 text-white hover:text-gray-300 transition-opacity duration-300 z-[60] ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleCloseClick}
        style={{ pointerEvents: 'auto' }}
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      
      {isAnimating && !imageLoaded && showLoadingBar && <LoadingSpinner />}
      
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
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backfaceVisibility: 'hidden',
          perspective: 1000,
          willChange: 'transform' 
        }}
      >
        <div
          className="absolute"
          style={{...imageContainerStyle, backfaceVisibility: 'hidden' as const}}
        >
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            {isAnimating && (
              <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"
                style={{
                  opacity: 1,
                  willChange: 'opacity',
                }}
              />
            )}
            
            <div
              className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${thumbnailUrl})`,
                willChange: 'opacity',
              }}
            />
            
            {(showHighRes || imageLoaded) && (
              <div
                className="absolute inset-0 z-20"
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transitionProperty: 'opacity',
                  transitionDuration: '600ms',
                  transitionTimingFunction: 'ease-out',
                  willChange: 'opacity',
                }}
              >
                <img
                  src={getModifiedImageUrl(selectedImage.image.uuid, 1500)}
                  alt="Full resolution preview"
                  className="w-full h-full object-contain"
                  onLoad={onHighResImageLoad}
                  loading="eager"
                  style={{
                    willChange: 'opacity',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ImagePreviewModal.displayName = 'ImagePreviewModal';

export default ImagePreviewModal; 