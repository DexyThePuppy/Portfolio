import React, { useEffect, useState } from 'react';
import { useNSFW } from '../contexts/NSFWContext';
import { ExclamationTriangleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const NSFWConsentPopup: React.FC = () => {
  const { showConsentPopup, setNsfwEnabled } = useNSFW();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (showConsentPopup) {
      // Small delay for mount animation
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [showConsentPopup]);

  const handleChoice = (enabled: boolean) => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setNsfwEnabled(enabled);
      setIsVisible(false);
      setIsAnimatingOut(false);
    }, 300);
  };

  if (!showConsentPopup) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center p-4
        transition-all duration-300 ease-out
        ${isVisible && !isAnimatingOut ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}
      `}
    >
      <div
        className={`
          relative max-w-md w-full bg-[#1a1a1a] rounded-2xl border border-[rgb(255,138,128)]/20
          shadow-2xl shadow-black/50 overflow-hidden
          transition-all duration-300 ease-out
          ${isVisible && !isAnimatingOut 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'}
        `}
      >
        {/* Header gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(255,138,128)] via-pink-500 to-purple-500" />
        
        {/* Content */}
        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[rgb(255,138,128)]/10 flex items-center justify-center">
              <ExclamationTriangleIcon className="w-7 h-7 text-[rgb(255,138,128)]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Age Verification</h2>
              <p className="text-sm text-white/50">Content preferences</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 space-y-3">
            <p className="text-white/80 text-sm leading-relaxed">
              This website contains content that may include adult-only (NSFW) material. 
              Would you like to enable NSFW content?
            </p>
            <p className="text-white/50 text-xs leading-relaxed">
              By enabling NSFW content, you confirm that you are of legal age (18+) in your jurisdiction 
              to view such material. Your preference will be saved in a cookie.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleChoice(false)}
              className="
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                bg-white/5 border border-white/10 text-white/80
                hover:bg-white/10 hover:border-white/20 hover:text-white
                transition-all duration-200 font-medium text-sm
                group
              "
            >
              <ShieldCheckIcon className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
              Keep it Safe
            </button>
            <button
              onClick={() => handleChoice(true)}
              className="
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                bg-[rgb(255,138,128)]/10 border border-[rgb(255,138,128)]/30 text-[rgb(255,138,128)]
                hover:bg-[rgb(255,138,128)]/20 hover:border-[rgb(255,138,128)]/50
                transition-all duration-200 font-medium text-sm
                group
              "
            >
              <span className="text-lg group-hover:scale-110 transition-transform">🔞</span>
              Enable NSFW (18+)
            </button>
          </div>

          {/* Footer note */}
          <p className="mt-4 text-center text-white/30 text-xs">
            You can change this preference at any time in settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default NSFWConsentPopup;
