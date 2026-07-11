import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useHapticsWithAudio } from '../hooks/useHapticsWithAudio';
import { playWhooshSound } from '../utils/audioHaptics';

// Components
import Banner from './Banner';
import ImageModal from './ImageModal';
import GalleryItem, { type GalleryClickEvent } from './GalleryItem';
import ProfileHeader from './ProfileHeader';
import TabNavbar from './TabNavbar';
import TechGridCard from './cards/TechGridCard';
import PlatformGridCard from './cards/PlatformGridCard';
import SocialGridCard from './cards/SocialGridCard';
import SettingsContent from './SettingsContent';
import {
  StatsSection,
  HobbiesSection,
} from './sections';
const KinksTable = React.lazy(() => import('./KinksTable'));

// Context
import { useNSFW } from '../contexts/NSFWContext';
import { useTab, type TabType } from '../contexts/TabContext';

// Data
import {
  statsInfo,
  hobbies,
  languages,
  techSetup,
  platforms,
} from '../data/profileData';

// Types
import type { ProfileImage, Profile as ProfileType } from '../types/index';

// Utils
import { getSocialCustomIcon } from '../utils/socialNetworks';
import { getModifiedImageUrl, getGalleryImageSize } from '../utils/imageUtils';
import { getGalleryColumnCount, getGalleryStaggerIndex } from '../utils/galleryUtils';
import { calculateAge } from '../utils/dateUtils';
import { ANIMATION_TIMINGS, BANNER } from '../constants';

interface ProfileProps {
  profile: ProfileType;
}

// Shown while a lazy-loaded tab chunk is being fetched (avoids an empty flash)
const TabLoadingFallback: React.FC = () => (
  <div
    className="fly-in bg-surface-container-high rounded-xl border border-[var(--color-primary-muted)] shadow-sm flex items-center justify-center gap-3 py-12"
    role="status"
    aria-live="polite"
  >
    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
    <span className="text-sm text-on-surface-variant">Loading…</span>
  </div>
);

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const { nsfwEnabled } = useNSFW();
  const { trigger } = useHapticsWithAudio();
  
  const publicSocialAccounts = profile.socialAccounts.filter(
    (account: any) => account.accessPermission === 'public'
  );

  // Filter images based on NSFW preference
  const galleryImages = useMemo(() => {
    const publicImgs = profile.images.filter(
      (img: any) => img.accessPermission === 'public' && !img.isAd &&
                   img.image.uuid !== profile.profileImage.image.uuid // Exclude profile image
    );

    if (nsfwEnabled) {
      // Show all images (safe + nsfw)
      return publicImgs;
    } else {
      // Only show SFW images
      return publicImgs.filter(
        (img: any) => img.image.contentRating === 'safe'
      );
    }
  }, [profile.images, profile.profileImage.image.uuid, nsfwEnabled]);

  const { activeTab, setActiveTab } = useTab();

  // Switch away from kinks tab if NSFW is disabled
  useEffect(() => {
    if (!nsfwEnabled && activeTab === 'kinks') {
      setActiveTab('gallery');
    }
  }, [nsfwEnabled, activeTab, setActiveTab]);

  // Scroll back to the top when switching tabs (skip initial mount)
  const isFirstTabRenderRef = useRef(true);
  useEffect(() => {
    if (isFirstTabRenderRef.current) {
      isFirstTabRenderRef.current = false;
      return;
    }
    // Instant, not smooth: a smooth scroll would run concurrently with the
    // fly-in entrance, forcing the banner parallax + glass backdrop blur to
    // repaint every frame while the new tab is animating in.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  // WebKit detection for Safari-specific styling
  const [isWebKit, setIsWebKit] = useState(false);
  useEffect(() => {
    const isWebKitBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      /AppleWebKit/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    setIsWebKit(isWebKitBrowser);
  }, []);

  const [galleryColumnCount, setGalleryColumnCount] = useState(() =>
    typeof window !== 'undefined' ? getGalleryColumnCount(window.innerWidth) : 4,
  );
  useEffect(() => {
    const onResize = () => setGalleryColumnCount(getGalleryColumnCount(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Hover state - tracks which item is currently hovered (works for all tabs)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Consolidated timeout refs for easier management
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle hover state changes with delayed unhover
  const handleSetHoveredId = useCallback((id: string | null) => {
    // Clear existing hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (id !== null) {
      // Set hover immediately
      setHoveredId(id);
    } else {
      // Delay unhover to allow transition to complete
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredId(null);
        hoverTimeoutRef.current = null;
      }, ANIMATION_TIMINGS.HOVER_DELAY);
    }
  }, []);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Modal state
  const [selectedImage, setSelectedImage] = useState<ProfileImage | null>(null);
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialRotation, setInitialRotation] = useState(0);
  const [liftedImageId, setLiftedImageId] = useState<string | null>(null);
  const [modalOpenNonce, setModalOpenNonce] = useState(0);
  const [droppingImageId, setDroppingImageId] = useState<string | null>(null);

  // ==========================================================================
  // Tab-aware image preloading: warm the active tab's images immediately,
  // and the remaining tabs only once the browser is idle. Avoids downloading
  // every image on first paint.
  // ==========================================================================
  const preloadedTabsRef = useRef<Set<string>>(new Set());

  const preloadTabImages = useCallback((tab: TabType) => {
    // Gallery contents change with the NSFW toggle, so key by it
    const key = tab === 'gallery' ? `gallery:${nsfwEnabled}` : tab;
    if (preloadedTabsRef.current.has(key)) return;
    preloadedTabsRef.current.add(key);

    const urls: string[] = [];
    if (tab === 'gallery') {
      const size = getGalleryImageSize();
      galleryImages.forEach((photo: any) => {
        urls.push(getModifiedImageUrl(photo.image.uuid, size));
      });
    } else if (tab === 'tech') {
      techSetup.forEach((item) => item.image && urls.push(item.image));
    } else if (tab === 'platforms') {
      platforms.forEach((platform) => platform.image && urls.push(platform.image));
    } else if (tab === 'socials') {
      publicSocialAccounts.forEach((account: any) => {
        const customIcon = getSocialCustomIcon(account.socialNetwork);
        if (customIcon) urls.push(customIcon);
      });
    }

    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [galleryImages, publicSocialAccounts, nsfwEnabled]);

  // Active tab: preload right away
  useEffect(() => {
    preloadTabImages(activeTab);
  }, [activeTab, preloadTabImages]);

  // Other tabs: warm during idle time so tab switches still feel instant
  useEffect(() => {
    const warmRemaining = () => {
      (['gallery', 'tech', 'platforms', 'socials'] as TabType[]).forEach(preloadTabImages);
    };
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(warmRemaining, { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warmRemaining, 3000);
    return () => clearTimeout(id);
  }, [preloadTabImages]);

  // Track thumbnail URL for instant preview
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  // Handle image click from gallery
  const handleImageClick = (
    image: ProfileImage,
    _index: number,
    element: HTMLDivElement | null,
    rotation: number = 0
  ) => {
    if (!element) return;

    // Clear hover state immediately
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredId(null);

    // Get the clicked image's actual src (already loaded in browser)
    const imgElement = element.querySelector('img');
    const currentSrc = imgElement?.currentSrc || imgElement?.src || '';
    setThumbnailUrl(currentSrc);

    // Store the rotation for modal
    setInitialRotation(rotation);

    // Play whoosh sound immediately when image is clicked (before modal opens)
    playWhooshSound(0.5).catch(() => {
      // Silently fail if whoosh sound is unavailable
    });

    // Get the clicked image position immediately
    const rect = element.getBoundingClientRect();
    setStartPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedImage(image);
    setIsModalOpen(true);
    // Force the modal to re-run its loading pipeline even if the same image is clicked repeatedly
    setModalOpenNonce((n) => n + 1);
  };

  // Handle gallery image click (mouse or keyboard)
  const handleGalleryImageClick = (photo: ProfileImage, index: number, e: GalleryClickEvent, rotation: number) => {
    e.stopPropagation();
    // Haptic feedback on image click
    trigger('light');
    // Visually "lift" the clicked tile out of the gallery while the modal animates
    setLiftedImageId(photo.id);
    const element = e.currentTarget as HTMLDivElement;
    handleImageClick(photo, index, element, rotation);
  };

  // Navigate between gallery images while the modal is open (wraps around)
  const handleNavigateImage = useCallback((direction: 1 | -1) => {
    if (!selectedImage || galleryImages.length < 2) return;
    const currentIndex = galleryImages.findIndex((img: any) => img.id === selectedImage.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    const nextImage = galleryImages[nextIndex];

    // Anchor open/close animations to the new image's gallery tile when visible
    const tile = document.querySelector<HTMLElement>(`[data-photo-id="${nextImage.id}"]`);
    if (tile) {
      const rect = tile.getBoundingClientRect();
      setStartPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
      const imgElement = tile.querySelector('img');
      setThumbnailUrl(imgElement?.currentSrc || imgElement?.src || '');
    } else {
      setThumbnailUrl('');
    }

    setInitialRotation(0);
    setLiftedImageId(nextImage.id);
    setSelectedImage(nextImage);
    setModalOpenNonce((n) => n + 1);
  }, [selectedImage, galleryImages]);

  const selectedImageIndex = selectedImage
    ? galleryImages.findIndex((img: any) => img.id === selectedImage.id)
    : -1;

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    // Trigger drop-down effect on gallery item
    if (selectedImage) {
      setDroppingImageId(selectedImage.id);
      setTimeout(() => setDroppingImageId(null), ANIMATION_TIMINGS.MODAL_CLOSE);
    }
    
    setSelectedImage(null);
    setStartPosition(null);
    setIsModalOpen(false);
    setLiftedImageId(null);
    setInitialRotation(0);
    setThumbnailUrl('');
  }, [selectedImage]);


  return (
    <div className="min-h-[100dvh] bg-background text-on-background">
      <Banner imageUrl="/img/banner.JPEG" isModalOpen={isModalOpen} />

      <div
        className="relative z-10 flex flex-col"
        style={{
          minHeight: '100dvh',
          paddingTop: `calc(${BANNER.HEIGHT} - ${BANNER.HEADER_OVERLAP})`,
        }}
      >
        {/* Full header sits on the banner, above the glass panel edge */}
        <div className="profile-panel mb-4">
          <div className="container mx-auto px-4">
            <ProfileHeader
              displayName={profile.displayName}
              profileImageUrl={getModifiedImageUrl(profile.profileImage.image.uuid)}
              biography={profile.bio.biography}
              location={{
                region: profile.location.place.region,
                country: profile.location.place.country,
              }}
              age={calculateAge(profile.dateOfBirth)}
              species="Shep × Bernese × Dragon"
              relationshipStatus="Single and looking"
              personality="Ambivert"
              languages={languages}
            />
          </div>
        </div>

        <div
          className="profile-glass-panel profile-panel rounded-t-3xl flex-1"
          style={{ minHeight: `calc(100dvh - ${BANNER.HEIGHT})` }}
        >
          {/* Tabbed content */}
          <div className="container mx-auto px-4 pb-24">
            <div className="pt-5">
              <div
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
              >
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
                    <StatsSection categories={statsInfo} className="contents" />
                    <HobbiesSection items={hobbies} className="contents" startIndex={statsInfo.length} />
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                  <div className="fly-in bg-surface-container-high rounded-xl overflow-visible border border-[var(--color-primary-muted)] shadow-sm isolate">
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
                      <h3 className="text-sm font-semibold text-on-surface">Gallery</h3>
                      <span className="text-xs text-on-surface-variant">({galleryImages.length})</span>
                    </div>
                    <div className={`relative z-0 px-2 pt-2 pb-2 gallery-masonry${isWebKit ? ' is-webkit' : ''}`}>
                      {galleryImages.map((photo: any, index: number) => {
                        const optimalSize = getGalleryImageSize();
                        return (
                          <GalleryItem
                            key={photo.id}
                            photo={photo}
                            index={index}
                            staggerIndex={getGalleryStaggerIndex(
                              index,
                              galleryImages.length,
                              galleryColumnCount,
                              isWebKit,
                            )}
                            isLoaded={true}
                            optimalSize={optimalSize}
                            displayName={profile.displayName}
                            getModifiedImageUrl={getModifiedImageUrl}
                            onImageClick={handleGalleryImageClick}
                            isLifted={liftedImageId === photo.id && selectedImage?.id === photo.id}
                            isDropping={droppingImageId === photo.id}
                            isHovered={hoveredId === photo.id}
                            setHoveredId={handleSetHoveredId}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Kinks Tab (NSFW only) */}
                {activeTab === 'kinks' && nsfwEnabled && (
                  <React.Suspense fallback={<TabLoadingFallback />}>
                    <KinksTable />
                  </React.Suspense>
                )}

                {/* Hardware Tab */}
                {activeTab === 'tech' && (
                  <div className="fly-in bg-surface-container-high rounded-xl overflow-visible border border-[var(--color-primary-muted)] shadow-sm isolate">
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
                      <h3 className="text-sm font-semibold text-on-surface">Hardware</h3>
                      <span className="text-xs text-on-surface-variant">({techSetup.length})</span>
                    </div>
                    <div className="relative z-0 px-2 pt-2 pb-2 flex flex-wrap gap-3 stagger">
                      {techSetup.map((item) => (
                        <TechGridCard
                          key={item.id}
                          item={item}
                          isHovered={hoveredId === `tech-${item.id}`}
                          setHoveredId={handleSetHoveredId}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Socials Tab */}
                {activeTab === 'socials' && (
                  <div className="fly-in bg-surface-container-high rounded-xl overflow-visible border border-[var(--color-primary-muted)] shadow-sm isolate">
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
                      <h3 className="text-sm font-semibold text-on-surface">Socials</h3>
                      <span className="text-xs text-on-surface-variant">({publicSocialAccounts.length})</span>
                    </div>
                    <div className="relative z-0 px-2 pt-2 pb-2 flex flex-wrap gap-3 stagger">
                      {publicSocialAccounts.map((account: any) => (
                        <SocialGridCard
                          key={account.id}
                          account={account}
                          isHovered={hoveredId === `social-${account.id}`}
                          setHoveredId={handleSetHoveredId}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Platforms Tab */}
                {activeTab === 'platforms' && (
                  <div className="fly-in bg-surface-container-high rounded-xl overflow-visible border border-[var(--color-primary-muted)] shadow-sm isolate">
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
                      <h3 className="text-sm font-semibold text-on-surface">Platforms</h3>
                      <span className="text-xs text-on-surface-variant">({platforms.length})</span>
                    </div>
                    <div className="relative z-0 px-2 pt-2 pb-2 flex flex-wrap gap-3 stagger">
                      {platforms.map((platform) => (
                        <PlatformGridCard
                          key={platform.id}
                          platform={platform}
                          isHovered={hoveredId === `platform-${platform.id}`}
                          setHoveredId={handleSetHoveredId}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && <SettingsContent />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TabNavbar nsfwEnabled={nsfwEnabled} />

      {/* Image Modal */}
      <ImageModal
        selectedImage={selectedImage}
        startPosition={startPosition}
        thumbnailUrl={thumbnailUrl}
        initialRotation={initialRotation}
        openNonce={modalOpenNonce}
        getImageUrl={getModifiedImageUrl}
        onClose={handleCloseModal}
        onNavigate={galleryImages.length > 1 ? handleNavigateImage : undefined}
        imageIndex={selectedImageIndex >= 0 ? selectedImageIndex : undefined}
        imageCount={galleryImages.length}
      />
    </div>
  );
};

export default Profile;
