import React, { useEffect, useState, useRef } from 'react';

interface BannerProps {
  imageUrl: string;
  isModalOpen?: boolean;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, isModalOpen = false }) => {
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
          currentY = currentY + (lastScrollY - currentY) * 0.075;
          setScrollY(currentY);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    const animate = () => {
      if (isModalOpenRef.current) return;
      
      if (Math.abs(lastScrollY - currentY) > 0.1) {
        currentY = currentY + (lastScrollY - currentY) * 0.075;
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
      <div className="fixed top-0 left-0 right-0 h-[50vh] z-0 overflow-hidden">
        <div
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            height: 'calc(100% + 100px)',
            width: '100%',
            transform: `translate3d(0, ${-50 + scrollY * -0.2}px, 0)`,
            willChange: 'transform',
            transition: 'transform 0.05s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        />
      </div>
      
      {/* Gradient Overlay - Fixed with banner */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-transparent to-secondary z-0 opacity-80" />
    </>
  );
};

export default Banner;
