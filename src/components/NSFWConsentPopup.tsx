import React, { useEffect, useRef, useState } from 'react';
import { useHapticsWithAudio } from '../hooks/useHapticsWithAudio';
import { useNSFW } from '../contexts/NSFWContext';
import { ExclamationTriangleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

const NSFWConsentPopup: React.FC = () => {
  const { showConsentPopup, setNsfwEnabled } = useNSFW();
  const { trigger } = useHapticsWithAudio();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showConsentPopup) {
      // Small delay for mount animation
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [showConsentPopup]);

  // Move focus into the dialog once it becomes visible
  useEffect(() => {
    if (isVisible && !isAnimatingOut) {
      firstButtonRef.current?.focus();
    }
  }, [isVisible, isAnimatingOut]);

  // Keep Tab focus cycling inside the dialog
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button');
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleChoice = (enabled: boolean) => {
    // Haptic feedback on choice
    trigger(enabled ? 'medium' : 'light');
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nsfw-consent-title"
        onKeyDown={handleKeyDown}
        className={`
          relative max-w-md w-full bg-surface-container-highest rounded-2xl border border-[var(--color-primary-muted-strong)]
          shadow-2xl shadow-black/50 overflow-hidden
          transition-all duration-300 ease-out
          ${isVisible && !isAnimatingOut 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'}
        `}
      >
        {/* Header gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-tertiary to-secondary" />
        
        {/* Content */}
        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-muted)] flex items-center justify-center">
              <ExclamationTriangleIcon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 id="nsfw-consent-title" className="text-xl font-bold text-on-surface">Age Verification</h2>
              <p className="text-sm text-on-surface-variant">Content preferences</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 space-y-3">
            <p className="text-on-surface/80 text-sm leading-relaxed">
              This website contains content that may include adult-only (NSFW) material. 
              Would you like to enable NSFW content?
            </p>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              By enabling NSFW content, you confirm that you are of legal age (18+) in your jurisdiction 
              to view such material. Your preference will be saved in a cookie.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              ref={firstButtonRef}
              onClick={() => handleChoice(false)}
              className="
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                bg-on-surface-5 border border-on-surface-10 text-on-surface
                hover:bg-on-surface-10 hover:border-on-surface-20 hover:text-on-surface
                transition-all duration-200 font-medium text-sm
                group
              "
            >
              <ShieldCheckIcon className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              Keep it Safe
            </button>
            <button
              onClick={() => handleChoice(true)}
              className="
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                bg-[var(--color-primary-muted)] border border-[var(--color-primary-30)] text-primary
                hover:bg-[var(--color-primary-muted-strong)] hover:border-[var(--color-primary-50)]
                transition-all duration-200 font-medium text-sm
                group
              "
            >
              <span className="text-lg group-hover:scale-110 transition-transform">🔞</span>
              Enable NSFW (18+)
            </button>
          </div>

          {/* Footer note */}
          <p className="mt-4 text-center text-on-surface-variant text-xs">
            You can change this preference at any time in settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default NSFWConsentPopup;
