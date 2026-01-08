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

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const isVip = profile.roles.includes('supporter_vip');
  const publicSocialAccounts = profile.socialAccounts.filter(
    (account) => account.accessPermission === 'public'
  );
  const publicImages = profile.images.filter(
    (img) => img.accessPermission === 'public' && !img.isAd
  );

  // Modal state
  const [selectedImage, setSelectedImage] = useState<ProfileImage | null>(null);
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailUrl = useRef<string>('');
  
  // Image cache tracking
  const loadedImages = useRef<{
    [key: string]: { src: string; width: number; height: number; isFullRes: boolean };
  }>({});
  const fullResLoadedImages = useRef<Set<string>>(new Set());
  const [galleryKey] = useState(0);

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
      const optimalSize = getGalleryImageSize();
      const url = getModifiedImageUrl(photo.image.uuid, optimalSize);
      
      const img = new Image();
      img.onload = () => {
        loadedImages.current[photo.image.uuid] = {
          src: url,
          width: img.naturalWidth,
          height: img.naturalHeight,
          isFullRes: img.naturalWidth >= 1200 || optimalSize >= 1200,
        };
        
        if (img.naturalWidth >= 1200 || optimalSize >= 1200) {
          fullResLoadedImages.current.add(photo.image.uuid);
        }
      };
      img.src = url;
    });
  }, [publicImages, getModifiedImageUrl, getGalleryImageSize]);

  // Handle image click from carousel or gallery
  const handleImageClick = (
    image: ProfileImage,
    _index: number,
    element: HTMLDivElement | null
  ) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const imgElement = element.querySelector('img');
    const currentSrc = imgElement?.currentSrc || imgElement?.src || '';
    
    thumbnailUrl.current = currentSrc || getModifiedImageUrl(image.image.uuid, getGalleryImageSize());

    setStartPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Handle gallery image click
  const handleGalleryImageClick = (photo: ProfileImage, index: number, e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLDivElement;
    handleImageClick(photo, index, element);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImage(null);
    setStartPosition(null);
    setIsModalOpen(false);
  };

  // Handle full-res image loaded callback
  const handleFullResLoaded = (uuid: string, width: number, height: number) => {
    loadedImages.current[uuid] = {
      src: getModifiedImageUrl(uuid, 1500),
      width,
      height,
      isFullRes: true,
    };
    fullResLoadedImages.current.add(uuid);
  };

  return (
    <div className="min-h-screen bg-secondary text-white">
      <Banner imageUrl="/img/banner.JPEG" isModalOpen={isModalOpen} />

      {/* Scrollable Content Area */}
      <div className="relative z-10">
        {/* Empty space to push content below the banner */}
        <div className="h-[30vh]" />

        {/* Main Content with dark background */}
        <div className="bg-secondary min-h-[35vh] rounded-t-3xl shadow-lg pt-10">
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
              fullResLoadedImages={fullResLoadedImages.current}
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
                <div className="lg:col-span-9">
                  <div
                    key={galleryKey}
                    className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 gallery-grid"
                  >
                    {publicImages.map((photo, index) => {
                      const optimalSize = getGalleryImageSize();
                      const isLoaded = fullResLoadedImages.current.has(photo.image.uuid);

                      return (
                        <div
                          key={photo.id}
                          className={`aspect-square rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 ring-1 ring-[rgb(255,138,128)]/10 hover:ring-[rgb(255,138,128)]/30 ${
                            isLoaded ? 'thumbnail-loaded' : ''
                          }`}
                          onClick={(e) => handleGalleryImageClick(photo, index, e)}
                        >
                          <img
                            src={getModifiedImageUrl(photo.image.uuid, optimalSize)}
                            alt={`${profile.displayName}'s photo ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            loading="lazy"
                          />
                        </div>
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
        thumbnailUrl={thumbnailUrl.current}
        getImageUrl={getModifiedImageUrl}
        onClose={handleCloseModal}
        onFullResLoaded={handleFullResLoaded}
        isFullResAlreadyLoaded={
          selectedImage ? fullResLoadedImages.current.has(selectedImage.image.uuid) : false
        }
      />
    </div>
  );
};

export default Profile;
