import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ProfileImage } from '../types';
import { getVisibleItems } from '../utils/imageUtils';
import { ANIMATION_TIMINGS, CAROUSEL, Z_INDEX, GALLERY } from '../constants';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotations, setRotations] = useState<{ [key: number]: number }>({});
  const [innerRotations, setInnerRotations] = useState<{ [key: number]: number }>({});

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
    const extended: ProfileImage[] = [];
    for (let i = 0; i < CAROUSEL.MULTIPLIER; i++) {
      extended.push(...shuffleArray(images));
    }
    return extended;
  }, [images, shuffleArray]);

  const [extendedImages, setExtendedImages] = useState(createExtendedImages);
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length * 2));

  const visibleItems = getVisibleItems(window.innerWidth);

  // Calculate item width
  const calculateItemWidth = useCallback(() => {
    if (!carouselContainerRef.current) return;
    const containerWidth = carouselContainerRef.current.clientWidth;
    const visible = getVisibleItems(window.innerWidth);
    const totalGaps = visible - 1;
    const availableWidth = containerWidth - (totalGaps * GALLERY.GAP);
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
    
    if (currentIndex >= extendedImages.length - visibleItems - CAROUSEL.MIN_THRESHOLD) {
      const newImages = createExtendedImages();
      setExtendedImages(newImages);
      setCurrentIndex(Math.floor(images.length * 2));
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    
    setTimeout(() => setIsAnimating(false), ANIMATION_TIMINGS.CAROUSEL_TRANSITION);
  }, [isAnimating, currentIndex, extendedImages.length, visibleItems, createExtendedImages, images.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (currentIndex <= CAROUSEL.MIN_THRESHOLD) {
      const newImages = createExtendedImages();
      setExtendedImages(newImages);
      setCurrentIndex(Math.floor(images.length * 2));
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    
    setTimeout(() => setIsAnimating(false), ANIMATION_TIMINGS.CAROUSEL_TRANSITION);
  }, [isAnimating, currentIndex, createExtendedImages, images.length]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, ANIMATION_TIMINGS.CAROUSEL_AUTO_ADVANCE);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, handleNext]);

  const handleImageClickInternal = (image: ProfileImage, index: number) => {
    if (isAnimating) return;
    const element = imageRefs.current[`image-${index}`];
    onImageClick(image, index, element);
  };

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
    // Generate random rotation: 5-10° or -5 to -10°
    const randomRange = Math.random() * 5;
    const baseRotation = 5 + randomRange;
    const direction = Math.random() < 0.5 ? 1 : -1;
    const newRotation = baseRotation * direction;
    setRotations(prev => ({ ...prev, [index]: newRotation }));
    
    // Delayed inner rotation (smoother, smaller)
    setTimeout(() => {
      const innerRandomRange = Math.random() * 3;
      const innerBaseRotation = 3 + innerRandomRange;
      const innerDirection = Math.random() < 0.5 ? 1 : -1;
      setInnerRotations(prev => ({ ...prev, [index]: innerBaseRotation * innerDirection }));
    }, ANIMATION_TIMINGS.INNER_ROTATION_DELAY);
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    setHoveredIndex(null);
    setInnerRotations(prev => ({ ...prev, [index]: 0 }));
    // Delay rotation reset to match scale transition
    setTimeout(() => setRotations(prev => ({ ...prev, [index]: 0 })), ANIMATION_TIMINGS.HOVER_DELAY);
  }, []);

  return (
    <div className="carousel-container relative z-20" ref={carouselContainerRef} style={{ overflow: 'visible' }}>
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
          transform: `translateX(-${currentIndex * (itemWidth + GALLERY.GAP)}px)`,
          width: 'max-content',
          paddingLeft: '0.25rem',
          paddingRight: '0.25rem',
          transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'visible'
        }}
      >
        {extendedImages.map((image, index) => {
          const isLoaded = fullResLoadedImages.has(image.image.uuid);
          const isHovered = hoveredIndex === index;
          const rotation = rotations[index] || 0;
          const innerRotation = innerRotations[index] || 0;
          
          return (
            <div
              key={`${image.id}-${index}`}
              className={`carousel-item relative cursor-pointer ${isLoaded ? 'thumbnail-loaded' : ''}`}
              onClick={() => handleImageClickInternal(image, index)}
              ref={el => imageRefs.current[`image-${index}`] = el}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
                flexBasis: `${itemWidth}px`,
                zIndex: isHovered ? Z_INDEX.GALLERY_HOVERED : 20,
                overflow: 'visible',
                transform: isHovered ? `scale(${GALLERY.HOVER_SCALE}) rotate(${rotation}deg)` : 'scale(1) rotate(0deg)',
                transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div 
                className="rounded-xl overflow-hidden w-full h-full"
                style={{
                  boxShadow: isHovered 
                    ? '0 0 0 6px #1A1A1A' 
                    : '0 0 0 1px rgba(255, 138, 128, 0.1)',
                  transition: 'box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <img
                  src={getImageUrl(image.image.uuid)}
                  alt={`${displayName}'s photo ${index + 1}`}
                  loading="lazy"
                  draggable="false"
                  className="w-full h-full object-cover pointer-events-auto"
                  style={{
                    display: 'block',
                    transform: isHovered ? `scale(${GALLERY.INNER_HOVER_SCALE}) rotate(${innerRotation}deg)` : 'scale(1) rotate(0deg)',
                    transition: 'transform 600ms cubic-bezier(0.25, 1.2, 0.5, 1)',
                  }}
                />
              </div>
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
