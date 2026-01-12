import React, { useState, useRef, useEffect, useCallback } from 'react';

// Components
import Banner from './Banner';
import ProfileHeader from './ProfileHeader';
import ImageCarousel from './ImageCarousel';
import ImageModal from './ImageModal';
import {
  AboutSection,
  StatsSection,
  HobbiesSection,
  TechSetupSection,
  PlatformsSection,
  SocialLinksSection,
} from './sections';

// Data
import {
  mainInfo,
  statsInfo,
  hobbies,
  languages,
  techSetup,
  platforms,
} from '../data/profileData';

// Types
interface UploadedImage {
  uuid: string;
  contentRating: string;
  width: number;
  height: number;
  blurHash: string;
}

interface ProfileImage {
  id: string;
  image: UploadedImage;
  accessPermission: string;
  isAd: boolean;
}

interface Place {
  region: string;
  country: string;
  countryCode: string;
}

interface ProfileLocation {
  type: string;
  homePlace: Place;
  place: Place;
}

interface SocialAccount {
  id: string;
  socialNetwork: string;
  isVerified: boolean;
  url: string;
  displayName: string;
  value: string;
  accessPermission: string;
}

interface ProfileProps {
  profile: {
    id: string;
    uuid: string;
    displayName: string;
    username: string;
    roles: string[];
    age: number;
    dateOfBirth: string;
    profileImage: ProfileImage;
    location: ProfileLocation;
    images: ProfileImage[];
    bio: {
      biography: string;
      genders: string[];
      languages: string[];
      relationshipStatus: string;
    };
    socialAccounts: SocialAccount[];
  };
}

// Gallery Item Component with z-index management
interface GalleryItemProps {
  photo: ProfileImage;
  index: number;
  isLoaded: boolean;
  optimalSize: number;
  displayName: string;
  getModifiedImageUrl: (uuid: string, width?: number) => string;
  onImageClick: (photo: ProfileImage, index: number, e: React.MouseEvent, rotation: number) => void;
  isLifted: boolean;
  isDropping: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = React.memo(({
  photo,
  index,
  isLoaded,
  optimalSize,
  displayName,
  getModifiedImageUrl,
  onImageClick,
  isLifted,
  isDropping,
  hoveredId,
  setHoveredId,
}) => {
  const isHovered = hoveredId === photo.id;

  // Generate a new random rotation on every hover
  const [rotation, setRotation] = useState(0);
  const [innerRotation, setInnerRotation] = useState(0);

  const handleMouseEnter = useCallback(() => {
    setHoveredId(photo.id);
    // Generate random rotation: 5-10° or -5 to -10°
    const randomRange = Math.random() * 5; // 0 to 5
    const baseRotation = 5 + randomRange; // 5 to 10
    const direction = Math.random() < 0.5 ? 1 : -1; // Random direction
    const newRotation = baseRotation * direction;
    setRotation(newRotation);
    
    // Delayed inner rotation (smoother, smaller)
    setTimeout(() => {
      const innerRandomRange = Math.random() * 3; // 0 to 3
      const innerBaseRotation = 3 + innerRandomRange; // 3 to 6
      const innerDirection = Math.random() < 0.5 ? 1 : -1;
      setInnerRotation(innerBaseRotation * innerDirection);
    }, 150);
  }, [photo.id, setHoveredId]);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    setInnerRotation(0);
    // Delay rotation reset to match scale transition
    setTimeout(() => setRotation(0), 300);
  }, [setHoveredId]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    onImageClick(photo, index, e, rotation);
  }, [photo, index, onImageClick, rotation]);

  return (
    <div
      className="gallery-item-wrapper"
      style={{
        zIndex: isHovered ? 30 : 1,
        opacity: isLifted ? 0 : 1,
        pointerEvents: isLifted ? 'none' : undefined,
        transition: 'opacity 150ms ease-out',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`gallery-item rounded-xl cursor-pointer relative ${
          isLoaded ? 'thumbnail-loaded' : ''
        }`}
        onClick={handleClick}
        style={{ 
          overflow: 'visible',
          transform: isHovered 
            ? `scale(1.15) rotate(${rotation}deg)` 
            : isDropping 
              ? `scale(0.95) rotate(0deg)` 
              : 'scale(1) rotate(0deg)',
          transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        data-photo-id={photo.id}
      >
        <div 
          className="rounded-xl overflow-hidden"
          style={{
            boxShadow: isHovered 
              ? '0 0 0 6px #1A1A1A' 
              : '0 0 0 1px rgba(255, 138, 128, 0.1)',
            transition: 'box-shadow 300ms ease-out',
          }}
        >
          <img
            src={getModifiedImageUrl(photo.image.uuid, optimalSize)}
            alt={`${displayName}'s photo ${index + 1}`}
            className="w-full h-auto object-cover"
            loading="lazy"
            style={{ 
              display: 'block',
              transform: isHovered ? `scale(1.15) rotate(${innerRotation}deg)` : 'scale(1) rotate(0deg)',
              transition: 'transform 600ms cubic-bezier(0.25, 1.2, 0.5, 1)',
            }}
          />
        </div>
      </div>
    </div>
  );
});

GalleryItem.displayName = 'GalleryItem';

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const isVip = profile.roles.includes('supporter_vip');
  const publicSocialAccounts = profile.socialAccounts.filter(
    (account) => account.accessPermission === 'public'
  );
  const publicImages = profile.images.filter(
    (img) => img.accessPermission === 'public' && !img.isAd
  );

  // Gallery hover state - tracks which item is currently hovered
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
      // Delay unhover to allow transition to complete (matches 300ms transform transition)
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredId(null);
        hoverTimeoutRef.current = null;
      }, 300);
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

  // Get visible items for responsive sizing
  const getVisibleItems = (width: number) => {
    if (width <= 640) return 3;
    if (width <= 768) return 4;
    if (width <= 1024) return 5;
    if (width <= 1280) return 6;
    return 7;
  };

  // Calculate optimal image size
  const calculateOptimalImageSize = (
    containerWidth: number,
    devicePixelRatio = window.devicePixelRatio || 1
  ): number => {
    const size = Math.round((containerWidth * devicePixelRatio) / 50) * 50;
    return Math.max(200, Math.min(800, size));
  };

  // Get image URL with optional width
  const getModifiedImageUrl = useCallback((uuid: string, width?: number): string => {
    const columns = getVisibleItems(window.innerWidth);
    const containerWidth = window.innerWidth;
    
    const calculatedWidth =
      width ||
      calculateOptimalImageSize(Math.ceil(containerWidth / columns * 1.2));
    
    return `https://assets.barq.app/image/${uuid}.jpeg?width=${calculatedWidth}`;
  }, []);

  // Get gallery image size
  const getGalleryImageSize = useCallback((): number => {
    const dpr = window.devicePixelRatio || 1;
    const columns = getVisibleItems(window.innerWidth);
    const baseSize = window.innerWidth / columns;
    return calculateOptimalImageSize(baseSize, dpr);
  }, []);

  // Preload gallery images
  useEffect(() => {
    publicImages.forEach((photo) => {
      const img = new Image();
      img.src = getModifiedImageUrl(photo.image.uuid, getGalleryImageSize());
    });
  }, [publicImages, getModifiedImageUrl, getGalleryImageSize]);

  // Track thumbnail URL for instant preview
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  // Handle image click from carousel or gallery
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

  // Handle gallery image click
  const handleGalleryImageClick = (photo: ProfileImage, index: number, e: React.MouseEvent, rotation: number) => {
    e.stopPropagation();
    // Visually "lift" the clicked tile out of the gallery while the modal animates
    setLiftedImageId(photo.id);
    const element = e.currentTarget as HTMLDivElement;
    handleImageClick(photo, index, element, rotation);
  };

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    // Trigger drop-down effect on gallery item
    if (selectedImage) {
      setDroppingImageId(selectedImage.id);
      setTimeout(() => setDroppingImageId(null), 300);
    }
    
    setSelectedImage(null);
    setStartPosition(null);
    setIsModalOpen(false);
    setLiftedImageId(null);
    setInitialRotation(0);
    setThumbnailUrl('');
  }, [selectedImage]);


  return (
    <div className="min-h-screen bg-secondary text-white">
      <Banner imageUrl="/img/banner.JPEG" isModalOpen={isModalOpen} />

      {/* Scrollable Content Area */}
      <div className="relative z-10">
        {/* Empty space to push content below the banner */}
        <div className="h-[30vh]" />

        {/* Main Content with dark background */}
        <div className="bg-secondary min-h-[35vh] rounded-t-3xl shadow-lg pt-10 border-t border-[rgb(255,138,128)]/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <ProfileHeader
              displayName={profile.displayName}
              profileImageUrl={getModifiedImageUrl(profile.profileImage.image.uuid)}
              isVip={isVip}
              location={{
                region: profile.location.place.region,
                country: profile.location.place.country,
              }}
              age={profile.age}
            />

            <ImageCarousel
              images={publicImages}
              displayName={profile.displayName}
              onImageClick={handleImageClick}
              getImageUrl={getModifiedImageUrl}
              fullResLoadedImages={new Set()}
            />

            {/* Main Content */}
            <div className="mt-8">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column - Info Sections */}
                <div className="lg:col-span-3">
                  <AboutSection items={mainInfo} languages={languages} />
                  <StatsSection categories={statsInfo} />
                  <HobbiesSection items={hobbies} />
                  <TechSetupSection items={techSetup} />
                  <PlatformsSection items={platforms} />
                  <SocialLinksSection accounts={publicSocialAccounts} />
                </div>

                {/* Right Column - Photo Grid */}
                <div className="lg:col-span-9 overflow-visible">
                  <div className="gallery-masonry">
                    {publicImages.map((photo, index) => {
                      const optimalSize = getGalleryImageSize();

                      return (
                        <GalleryItem
                          key={photo.id}
                          photo={photo}
                          index={index}
                          isLoaded={true}
                          optimalSize={optimalSize}
                          displayName={profile.displayName}
                          getModifiedImageUrl={getModifiedImageUrl}
                          onImageClick={handleGalleryImageClick}
                          isLifted={liftedImageId === photo.id && selectedImage?.id === photo.id}
                          isDropping={droppingImageId === photo.id}
                          hoveredId={hoveredId}
                          setHoveredId={handleSetHoveredId}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        selectedImage={selectedImage}
        startPosition={startPosition}
        thumbnailUrl={thumbnailUrl}
        initialRotation={initialRotation}
        openNonce={modalOpenNonce}
        getImageUrl={getModifiedImageUrl}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Profile;
