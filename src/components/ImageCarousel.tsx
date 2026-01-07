import React, { useState, useRef, useEffect, useCallback } from 'react';

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

interface ImageCarouselProps {
  images: ProfileImage[];
  displayName: string;
  onImageClick: (image: ProfileImage, index: number, element: HTMLDivElement | null) => void;
  getImageUrl: (uuid: string, width?: number) => string;
  fullResLoadedImages: Set<string>;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  displayName,
  onImageClick,
  getImageUrl,
  fullResLoadedImages,
}) => {
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [itemWidth, setItemWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Shuffle array helper
  const shuffleArray = useCallback((array: ProfileImage[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Create extended images for infinite scroll
  const createExtendedImages = useCallback(() => {
    const multiplier = 5;
    const extended: ProfileImage[] = [];
    for (let i = 0; i < multiplier; i++) {
      extended.push(...shuffleArray(images));
    }
    return extended;
  }, [images, shuffleArray]);

  const [extendedImages, setExtendedImages] = useState(createExtendedImages);
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length * 2));

  // Calculate visible items based on screen width
  const getVisibleItems = (width: number) => {
    if (width <= 640) return 3;
    if (width <= 768) return 4;
    if (width <= 1024) return 5;
    if (width <= 1280) return 6;
    return 7;
  };

  const visibleItems = getVisibleItems(window.innerWidth);

  // Calculate item width
  const calculateItemWidth = useCallback(() => {
    if (!carouselContainerRef.current) return;
    const containerWidth = carouselContainerRef.current.clientWidth;
    const visible = getVisibleItems(window.innerWidth);
    const gap = 8;
    const totalGaps = visible - 1;
    const availableWidth = containerWidth - (totalGaps * gap);
    const calculatedItemWidth = Math.floor(availableWidth / visible);
    setItemWidth(calculatedItemWidth);
  }, []);

  useEffect(() => {
    calculateItemWidth();
    const handleResize = () => calculateItemWidth();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateItemWidth]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (currentIndex >= extendedImages.length - visibleItems - 5) {
      const newImages = createExtendedImages();
      setExtendedImages(newImages);
      setCurrentIndex(Math.floor(images.length * 2));
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex, extendedImages.length, visibleItems, createExtendedImages, images.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (currentIndex <= 5) {
      const newImages = createExtendedImages();
      setExtendedImages(newImages);
      setCurrentIndex(Math.floor(images.length * 2));
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex, createExtendedImages, images.length]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, handleNext]);

  const handleImageClickInternal = (image: ProfileImage, index: number) => {
    if (isAnimating) return;
    const element = imageRefs.current[`image-${index}`];
    onImageClick(image, index, element);
  };

  return (
    <div className="carousel-container relative z-20" ref={carouselContainerRef}>
      <button 
        onClick={handlePrev}
        className="carousel-button prev z-30"
        disabled={isAnimating}
        aria-label="Previous image"
        style={{ left: 0, position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div 
        className="carousel-track"
        style={{ 
          transform: `translateX(-${currentIndex * (itemWidth + 8)}px)`,
          width: 'max-content',
          paddingLeft: '0.25rem',
          paddingRight: '0.25rem'
        }}
      >
        {extendedImages.map((image, index) => {
          const isLoaded = fullResLoadedImages.has(image.image.uuid);
          
          return (
            <div
              key={`${image.id}-${index}`}
              className={`carousel-item relative z-20 cursor-pointer overflow-hidden ${isLoaded ? 'thumbnail-loaded' : ''}`}
              onClick={() => handleImageClickInternal(image, index)}
              ref={el => imageRefs.current[`image-${index}`] = el}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
                flexBasis: `${itemWidth}px`
              }}
            >
              <img
                src={getImageUrl(image.image.uuid)}
                alt={`${displayName}'s photo ${index + 1}`}
                loading="lazy"
                draggable="false"
                className="w-full h-full object-cover pointer-events-auto transition-transform duration-300 hover:scale-110"
              />
            </div>
          );
        })}
      </div>
      
      <button 
        onClick={handleNext}
        className="carousel-button next z-30"
        disabled={isAnimating}
        aria-label="Next image"
        style={{ right: 0, position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ImageCarousel;
