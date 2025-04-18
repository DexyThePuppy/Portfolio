import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPinIcon, 
  UserIcon, 
  StarIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  CheckBadgeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

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
  place: string;
  region: string;
  country: string;
  countryCode: string;
  longitude: number;
  latitude: number;
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

interface Species {
  id: string;
  displayName: string;
}

interface Sona {
  id: string;
  displayName: string;
  hasFursuit: boolean;
  species: Species;
  images: ProfileImage[];
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
    sonas: Sona[];
  };
}

const getImageUrl = (uuid: string, width: number = 374) => {
  return `https://assets.barq.app/image/${uuid}.jpeg?width=${width}`;
};

const Profile: React.FC<ProfileProps> = ({
  profile
}) => {
  const isVip = profile.roles.includes('supporter_vip');
  const publicSocialAccounts = profile.socialAccounts.filter(account => account.accessPermission === 'public');
  const publicImages = profile.images.filter(img => img.accessPermission === 'public' && !img.isAd);
  const [selectedImage, setSelectedImage] = useState<ProfileImage | null>(null);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHighRes, setShowHighRes] = useState(false);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const thumbnailUrl = useRef<string>('');
  const scrollPosition = useRef(0);

  // Format biography sections
  const bioSections = profile.bio.biography.split('\n\n').map(section => section.trim());

  useEffect(() => {
    if (selectedImage) {
      // Store current scroll position and lock the page
      scrollPosition.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position and unlock the page
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition.current);
    }
  }, [selectedImage]);

  const calculateExpandedDimensions = () => {
    if (!startPosition) return null;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const imageRatio = startPosition.width / startPosition.height;
    const viewportRatio = viewportWidth / viewportHeight;
    
    let finalWidth, finalHeight;
    if (imageRatio > viewportRatio) {
      finalWidth = viewportWidth * 0.9;
      finalHeight = finalWidth / imageRatio;
    } else {
      finalHeight = viewportHeight * 0.9;
      finalWidth = finalHeight * imageRatio;
    }
    
    return {
      width: finalWidth,
      height: finalHeight,
      x: (viewportWidth - finalWidth) / 2,
      y: (viewportHeight - finalHeight) / 2
    };
  };

  const handleImageClick = (image: ProfileImage, index: number) => {
    const imageElement = imageRefs.current[`image-${index}`];
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      
      thumbnailUrl.current = getImageUrl(image.image.uuid);
      
      setStartPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
      setSelectedImage(image);
      setShowHighRes(false);
      requestAnimationFrame(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setShowHighRes(true);
        }, 300);
      });
    }
  };

  const handleClosePreview = () => {
    setIsAnimating(false);
    setShowHighRes(false);
    setTimeout(() => {
      setSelectedImage(null);
      setStartPosition(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-secondary text-white">
      {/* Mobile Header - Removed */}
      {/* Desktop Navigation - Removed */}

      {/* User Banner */}
      <div className="relative h-32 lg:h-48 w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(publicImages[0]?.image.uuid)}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-secondary"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-8">
        {/* Profile Header - Mobile */}
        <div className="lg:hidden mb-6">
          <div className="flex items-start gap-4">
            <div className="relative -mt-10">
              <img
                src={getImageUrl(profile.profileImage.image.uuid)}
                alt={profile.displayName}
                className="w-20 h-20 rounded-full object-cover border-2 border-secondary"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{profile.displayName}</h1>
                  {isVip && <StarIcon className="w-5 h-5 text-yellow-400" />}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-300 mt-2">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span>{profile.location.place.place}, {profile.location.place.country}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300 mt-1">
                <UserIcon className="w-4 h-4 mr-1" />
                <span>{profile.age}</span>
                <span className="mx-1">·</span>
                <span>{profile.bio.relationshipStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Image Preview Modal */}
        {selectedImage && startPosition && (
          <div 
            className={`fixed inset-0 z-50 ${isAnimating ? 'bg-black/90' : 'bg-transparent'} transition-colors duration-300`}
            onClick={handleClosePreview}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              willChange: 'background-color'
            }}
          >
            <button 
              className={`absolute top-4 right-4 text-white hover:text-gray-300 transition-opacity duration-300 z-[60] ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
              onClick={handleClosePreview}
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <div
              className="fixed transition-all duration-300 ease-[cubic-bezier(.17,.67,.24,.98)]"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: isAnimating ? calculateExpandedDimensions()?.width : startPosition.width,
                height: isAnimating ? calculateExpandedDimensions()?.height : startPosition.height,
                transform: isAnimating 
                  ? `translate3d(${calculateExpandedDimensions()?.x}px, ${calculateExpandedDimensions()?.y}px, 0)`
                  : `translate3d(${startPosition.x}px, ${startPosition.y}px, 0)`,
                transitionProperty: 'transform, width, height',
                transformOrigin: '0 0',
                willChange: 'transform, width, height',
                backfaceVisibility: 'hidden',
                perspective: 1000,
                WebkitBackfaceVisibility: 'hidden',
                WebkitPerspective: 1000
              }}
            >
              {/* Thumbnail for animation - always visible */}
              <img
                src={thumbnailUrl.current}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              />
              {/* High-res image overlay */}
              <img
                src={getImageUrl(selectedImage.image.uuid, 1200)}
                alt="Preview"
                className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
                  showHighRes ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              />
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Profile Info & Social */}
          <div className="col-span-3">
            <div className="bg-gray-custom rounded-2xl p-6 mb-6">
              <div className="relative -mt-20">
                <img
                  src={getImageUrl(profile.profileImage.image.uuid)}
                  alt={profile.displayName}
                  className="w-full aspect-square object-cover rounded-xl border-4 border-secondary"
                />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                {isVip && <StarIcon className="w-6 h-6 text-yellow-400" />}
              </div>
              <div className="mt-4 space-y-4">
                {bioSections.map((section, index) => (
                  <p key={index} className="text-gray-400 whitespace-pre-line">{section}</p>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  <span>{profile.location.place.place}, {profile.location.place.country}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <UserIcon className="w-5 h-5 mr-2" />
                  <span>{profile.age}</span>
                  <span className="mx-2">·</span>
                  <span>{profile.bio.relationshipStatus}</span>
                </div>
              </div>
            </div>

            {/* Social Accounts - Desktop */}
            <div className="bg-gray-custom rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Social Accounts</h2>
              <div className="space-y-3">
                {publicSocialAccounts.map((account) => (
                  <a
                    key={account.id}
                    href={account.url}
                    className="flex items-center justify-between text-gray-400 hover:text-white transition group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="group-hover:text-primary">{account.socialNetwork}</span>
                      {account.isVerified && (
                        <CheckBadgeIcon className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <span>{account.displayName}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Character Sonas */}
            <div className="bg-gray-custom rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Characters</h2>
              <div className="space-y-4">
                {profile.sonas.map((sona) => (
                  <div key={sona.id} className="flex items-center gap-3">
                    {sona.images[0] && (
                      <img
                        src={getImageUrl(sona.images[0].image.uuid)}
                        alt={sona.displayName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{sona.displayName}</p>
                      <p className="text-sm text-gray-400">{sona.species.displayName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-9">
            <div className="grid grid-cols-4 gap-4">
              {publicImages.map((photo, index) => (
                <div 
                  key={photo.id} 
                  ref={el => imageRefs.current[`image-${index}`] = el}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
                  onClick={() => handleImageClick(photo, index)}
                >
                  <img
                    src={getImageUrl(photo.image.uuid)}
                    alt={`${profile.displayName}'s photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Photo Grid */}
        <div className="lg:hidden">
          <div className="grid grid-cols-3 gap-2">
            {publicImages.slice(0, 6).map((photo, index) => (
              <div 
                key={photo.id} 
                ref={el => imageRefs.current[`image-${index}`] = el}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
                onClick={() => handleImageClick(photo, index)}
              >
                <img
                  src={getImageUrl(photo.image.uuid)}
                  alt={`${profile.displayName}'s photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Accounts - Mobile */}
        <div className="mt-6 lg:hidden">
          <h2 className="text-lg font-semibold mb-2">Social Accounts</h2>
          <div className="bg-gray-custom rounded-xl p-4 space-y-2">
            {publicSocialAccounts.map((account) => (
              <a
                key={account.id}
                href={account.url}
                className="flex items-center justify-between text-gray-400 hover:text-white transition group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-2">
                  <span className="group-hover:text-primary">{account.socialNetwork}</span>
                  {account.isVerified && (
                    <CheckBadgeIcon className="w-4 h-4 text-primary" />
                  )}
                </div>
                <span>{account.displayName}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Character Sonas - Mobile */}
        <div className="mt-6 mb-20 lg:hidden">
          <h2 className="text-lg font-semibold mb-2">Characters</h2>
          <div className="bg-gray-custom rounded-xl p-4 space-y-3">
            {profile.sonas.map((sona) => (
              <div key={sona.id} className="flex items-center gap-3">
                {sona.images[0] && (
                  <img
                    src={getImageUrl(sona.images[0].image.uuid)}
                    alt={sona.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium">{sona.displayName}</p>
                  <p className="text-sm text-gray-400">{sona.species.displayName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 