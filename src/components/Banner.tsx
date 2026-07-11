import React, { useEffect, useState, useRef } from 'react';
import { BANNER } from '../constants';

interface BannerProps {
  imageUrl: string;
  isModalOpen?: boolean;
}

const Banner: React.FC<BannerProps> = React.memo(({ imageUrl, isModalOpen = false }) => {
  const [scrollY, setScrollY] = useState(0);
  const isModalOpenRef = useRef(isModalOpen);

  // Update ref when prop changes
  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  // Handle parallax effect with smoothing
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    let currentY = 0;
    
    const handleScroll = () => {
      if (isModalOpenRef.current) return;
      
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          currentY = currentY + (lastScrollY - currentY) * BANNER.SCROLL_SMOOTHING;
          setScrollY(currentY);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    const animate = () => {
      // Pause (but keep scheduling) while the modal is open, otherwise the
      // loop would die permanently after the first modal open
      if (!isModalOpenRef.current && Math.abs(lastScrollY - currentY) > BANNER.SCROLL_THRESHOLD) {
        currentY = currentY + (lastScrollY - currentY) * BANNER.SCROLL_SMOOTHING;
        setScrollY(currentY);
      }
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Static fade on the fixed container (softens the overall banner region)
  const containerMask = 'linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.6) 78%, transparent 100%)';
  // Moving fade on the image itself: travels with the parallax so the image's
  // own bottom edge is never visible as a hard line
  const imageMask = 'linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.5) 82%, transparent 98%)';

  return (
    <>
      {/* Banner Image - Fixed at top with parallax effect, masked to fade out */}
      <div
        className="fixed top-0 left-0 right-0 z-0 overflow-hidden"
        style={{
          height: `calc(${BANNER.HEIGHT} + 8vh)`,
          WebkitMaskImage: containerMask,
          maskImage: containerMask,
        }}
      >
        <div
          role="img"
          aria-label="Profile banner"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            height: `calc(100% + ${BANNER.EXTRA_HEIGHT}px)`,
            width: '100%',
            transform: `translate3d(0, ${BANNER.INITIAL_OFFSET + scrollY * BANNER.PARALLAX_SPEED}px, 0)`,
            transition: 'transform 0.05s cubic-bezier(0.33, 1, 0.68, 1)',
            WebkitMaskImage: imageMask,
            maskImage: imageMask,
          }}
        />
        {/* Subtle darkening toward the bottom for contrast with the panel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-60"
        />
      </div>
    </>
  );
});

Banner.displayName = 'Banner';

export default Banner;
