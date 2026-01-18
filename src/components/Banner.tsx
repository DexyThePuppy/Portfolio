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
      if (isModalOpenRef.current) return;
      
      if (Math.abs(lastScrollY - currentY) > BANNER.SCROLL_THRESHOLD) {
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

  return (
    <>
      {/* Banner Image - Fixed at top with parallax effect */}
      <div className="fixed top-0 left-0 right-0 z-0 overflow-hidden" style={{ height: BANNER.HEIGHT }}>
        <div
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            height: `calc(100% + ${BANNER.EXTRA_HEIGHT}px)`,
            width: '100%',
            transform: `translate3d(0, ${BANNER.INITIAL_OFFSET + scrollY * BANNER.PARALLAX_SPEED}px, 0)`,
            transition: 'transform 0.05s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        />
      </div>
      
      {/* Gradient Overlay - Fixed with banner */}
      <div 
        className="fixed top-0 left-0 right-0 bg-gradient-to-b from-transparent to-secondary z-0 opacity-80" 
        style={{ height: BANNER.HEIGHT }}
      />
    </>
  );
});

Banner.displayName = 'Banner';

export default Banner;
