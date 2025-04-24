import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faLastfm,
  faBluesky,
  faInstagram,
  faTelegram,
  faDiscord,
  faSteam,
  faPlaystation,
  faWindows,
  faApple
} from '@fortawesome/free-brands-svg-icons';
import { 
  faGamepad,
  faDesktop,
  faTablet,
  faVrCardboard,
  faMemory,
  faComputer,
  faLaptop,
  faDisplay,
  faGhost
} from '@fortawesome/free-solid-svg-icons';
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
  XMarkIcon,
  GlobeAltIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ChatBubbleOvalLeftIcon,
  RocketLaunchIcon,
  LanguageIcon,
  LockClosedIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  CubeIcon,
  FilmIcon,
  MusicalNoteIcon,
  PhotoIcon,
  HeartIcon as HeartIconSolid,
  HandRaisedIcon,
  FaceSmileIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
  PaperAirplaneIcon,
  CakeIcon,
  ArrowTopRightOnSquareIcon,
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

interface SocialPreference {
  id: string;
  title: string;
  icon: React.ElementType;
}

interface JoinedGroup {
  id: string;
  name: string;
  icon: string;
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
    socialPreferences?: SocialPreference[];
    joinedGroups?: JoinedGroup[];
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
  
  // Create an extended array of images for infinite scroll
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create an array that's 5 times longer than the original, with shuffled duplicates
  const createExtendedImages = () => {
    const multiplier = 5;
    const extended = [];
    for (let i = 0; i < multiplier; i++) {
      extended.push(...shuffleArray(publicImages));
    }
    return extended;
  };

  const [extendedImages, setExtendedImages] = useState(createExtendedImages());
  const [selectedImage, setSelectedImage] = useState<ProfileImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(Math.floor(publicImages.length * 2)); // Start in the middle
  const [isAnimating, setIsAnimating] = useState(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [showHighRes, setShowHighRes] = useState(false);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const thumbnailUrl = useRef<string>('');
  const scrollPosition = useRef(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);

  // Main Info - Updated to match bio exactly
  const mainInfo = [
    { id: '1', title: 'Main', icon: UserIcon },
    { id: '2', title: '22 | Austria & Germany', icon: MapPinIcon },
    { id: '3', title: 'He/Him', icon: UserIcon },
    { id: '4', title: 'Australian Shep & Bernese Mountain Dog-dragon hybrid mix', icon: UserIcon },
    { id: '5', title: 'Gay Derg Doggo', icon: HeartIcon },
    { id: '6', title: 'Ambivert', icon: UserGroupIcon },
    { id: '7', title: 'Dating', icon: HeartIconSolid }
  ];

  // Stats - Updated to match bio exactly
  const statsInfo = [
    { 
      category: 'Physical',
      items: [
        { id: '1', title: 'Height 187cm/6.13feet', icon: UserIcon },
        { id: '2', title: 'Weight 99kg/218,3lbs', icon: HeartIcon }
      ]
    },
    {
      category: 'Traits',
      items: [
        { id: '1', title: 'Absolutely Adorable', icon: FaceSmileIcon },
        { id: '2', title: 'Cuddle Buddy', icon: HeartIconSolid }
      ]
    },
    {
      category: 'Personality',
      items: [
        { id: '1', title: 'Overwhelmed fast', icon: HandRaisedIcon },
        { id: '2', title: 'Emotionally Sensitive', icon: HeartIcon },
        { id: '3', title: 'Pretty shy', icon: FaceSmileIcon },
        { id: '4', title: 'Smol Spoon', icon: HeartIconSolid },
        { id: '5', title: 'Very jealous', icon: HeartIcon }
      ]
    }
  ];

  // Personality Traits
  const personalityTraits = [
    { id: '1', title: 'Absolutely Adorable', icon: FaceSmileIcon },
    { id: '2', title: 'Cuddle Buddy', icon: HeartIconSolid },
    { id: '3', title: 'Overwhelmed fast', icon: HandRaisedIcon },
    { id: '4', title: 'Emotionally Sensitive', icon: HeartIcon },
    { id: '5', title: 'Pretty shy', icon: FaceSmileIcon },
    { id: '6', title: 'Smol Spoon', icon: HeartIconSolid },
    { id: '7', title: 'Very jealous', icon: HeartIcon }
  ];

  // Professional Skills
  const professionalSkills = [
    { id: '1', title: 'Front-end Dev', icon: CloudIcon },
    { id: '2', title: '3D Artist', icon: CubeIcon },
    { id: '3', title: 'Future Content Creator', icon: FilmIcon },
    { id: '4', title: 'Music Producer', icon: MusicalNoteIcon }
  ];

  // Hobbies
  const hobbies = [
    { id: '1', title: 'Jailbreaking Devices', icon: WrenchScrewdriverIcon },
    { id: '2', title: 'Social Media', icon: PhotoIcon },
    { id: '3', title: 'PC/VR Gaming', icon: ComputerDesktopIcon }
  ];

  // Languages with flags
  const languages = [
    { id: '1', name: 'Austrian', flag: '🇦🇹' },
    { id: '2', name: 'German', flag: '🇩🇪' },
    { id: '3', name: 'American', flag: '🇺🇸' },
    { id: '4', name: 'Bosnian', flag: '🇧🇦' }
  ];

  // Tech Setup
  const techSetup = {
    gaming: [
      { id: '1', title: 'PC: Ryzen 9 7950x3D & RTX 4090', icon: ComputerDesktopIcon },
      { id: '2', title: 'VR: Quest 2, 4x Trackers & 2x Basestation', icon: DeviceTabletIcon }
    ],
    computers: [
      { id: '1', title: 'Laptop: Macbook M1 Pro 14', icon: ComputerDesktopIcon }
    ]
  };

  // Platforms
  const platforms = [
    { id: '1', title: 'Resonite', icon: faVrCardboard },
    { id: '2', title: 'VRChat', icon: faVrCardboard },
    { id: '3', title: 'Second Life', icon: faDesktop }
  ];

  // Calculate the number of visible items based on screen width
  const getVisibleItems = (width: number) => {
    if (width <= 640) return 3;
    if (width <= 768) return 4;
    if (width <= 1024) return 5;
    if (width <= 1280) return 6;
    return 7;
  };

  // Calculate item width based on container width
  const calculateItemWidth = () => {
    if (!carouselContainerRef.current) return;
    const containerWidth = carouselContainerRef.current.clientWidth;
    const visibleItems = getVisibleItems(window.innerWidth);
    const gap = 8; // 0.5rem gap
    const totalGaps = visibleItems - 1;
    const availableWidth = containerWidth - (totalGaps * gap);
    const calculatedItemWidth = Math.floor(availableWidth / visibleItems);
    setItemWidth(calculatedItemWidth);
  };

  const visibleItems = getVisibleItems(window.innerWidth);

  useEffect(() => {
    calculateItemWidth();
    const handleResize = () => {
      calculateItemWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // If we're near the end, reset to the middle while maintaining visual position
    if (currentIndex >= extendedImages.length - visibleItems - 5) {
      const newImages = createExtendedImages();
      setExtendedImages(newImages);
      setCurrentIndex(Math.floor(publicImages.length * 2));
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // If we're near the start, reset to the middle while maintaining visual position
    if (currentIndex <= 5) {
      const newImages = createExtendedImages();
      setExtendedImages(newImages);
      setCurrentIndex(Math.floor(publicImages.length * 2));
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

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
      {/* Hero Section with Banner */}
      <div className="relative">
        <div className="h-64 lg:h-96 w-full overflow-hidden">
          <img
            src={getImageUrl(publicImages[0]?.image.uuid)}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[rgb(255,138,128)]/20 to-secondary"></div>
        </div>
        
        {/* Profile Header */}
        <div className="absolute -bottom-16 lg:-bottom-24 w-full">
          <div className="container mx-auto px-4">
            <div className="flex items-end gap-6">
              <div className="relative">
                <img
                  src={getImageUrl(profile.profileImage.image.uuid)}
                  alt={profile.displayName}
                  className="w-32 h-32 lg:w-48 lg:h-48 rounded-2xl lg:rounded-3xl object-cover border-4 border-[rgb(255,138,128)] shadow-xl"
                />
                {isVip && (
                  <div className="absolute -top-2 -right-2 bg-[rgb(255,138,128)] text-white p-1 rounded-full">
                    <StarIcon className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <h1 className="text-3xl lg:text-5xl font-bold mb-2 text-white">{profile.displayName}</h1>
                <div className="flex items-center gap-4 text-gray-200">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
                    <span>{profile.location.place.place}, {profile.location.place.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CakeIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
                    <span>{profile.age} years old</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="container mx-auto px-4 mt-24 lg:mt-32">
        <div className="carousel-container" ref={carouselContainerRef}>
          <button 
            onClick={handlePrev}
            className="carousel-button prev"
            disabled={isAnimating}
            aria-label="Previous image"
            style={{ left: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            className="carousel-track"
            style={{ 
              transform: `translateX(-${currentIndex * (itemWidth + 8)}px)`,
              width: 'max-content',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem'
            }}
          >
            {extendedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="carousel-item"
                onClick={() => !isAnimating && handleImageClick(image, index)}
                style={{ 
                  width: `${itemWidth}px`,
                  flexBasis: `${itemWidth}px`
                }}
              >
                <img
                  src={getImageUrl(image.image.uuid)}
                  alt={`${profile.displayName}'s photo ${index + 1}`}
                  loading="lazy"
                  draggable="false"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="carousel-button next"
            disabled={isAnimating}
            aria-label="Next image"
            style={{ right: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3">
            {/* About Section */}
            <div className="section-card">
              <h2 className="section-title">About</h2>
              <div className="space-y-3">
                {mainInfo.map((info) => (
                  <div key={info.id} className="flex-center gap-small">
                    <info.icon className="icon-small icon-accent" />
                    <span className="section-text">{info.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="section-card">
              <h2 className="section-title">Stats</h2>
              <div className="space-y-4">
                {statsInfo.map((section) => (
                  <div key={section.category}>
                    <h3 className="text-sm font-semibold icon-accent mb-2">{section.category}</h3>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex-center gap-small">
                          <item.icon className="icon-small icon-accent" />
                          <span className="section-text">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Setup */}
            <div className="section-card">
              <h2 className="section-title">Tech Setup</h2>
              <div className="space-y-4">
                {Object.entries(techSetup).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold icon-accent mb-2">{category}</h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex-center gap-small">
                          <item.icon className="icon-small icon-accent" />
                          <span className="section-text">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className="section-card">
              <h2 className="section-title">Platforms</h2>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex-center gap-small">
                    <FontAwesomeIcon icon={platform.icon} className="icon-small icon-accent" />
                    <span className="section-text">{platform.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="section-card">
              <h2 className="section-title">Social Links</h2>
              <div className="space-y-3">
                {publicSocialAccounts.map((account) => {
                  let icon;
                  switch (account.socialNetwork.toLowerCase()) {
                    case 'twitter':
                      icon = faTwitter;
                      break;
                    case 'instagram':
                      icon = faInstagram;
                      break;
                    case 'discord':
                      icon = faDiscord;
                      break;
                    case 'steam':
                      icon = faSteam;
                      break;
                    default:
                      icon = GlobeAltIcon;
                  }

                  return (
                    <a
                      key={account.id}
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-icon-container section-card">
                        {typeof icon === 'function' ? (
                          React.createElement(icon, { className: "icon-small" })
                        ) : (
                          <FontAwesomeIcon icon={icon} className="icon-small" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex-center gap-small">
                          <span className="section-text">{account.displayName}</span>
                          {account.isVerified && (
                            <CheckBadgeIcon className="icon-small icon-accent" />
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{account.value}</span>
                      </div>
                      <ArrowTopRightOnSquareIcon className="icon-small icon-accent" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Photo Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {publicImages.map((photo, index) => (
                <div
                  key={photo.id}
                  ref={el => imageRefs.current[`image-${index}`] = el}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 ring-1 ring-[rgb(255,138,128)]/10 hover:ring-[rgb(255,138,128)]/30"
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
      </div>

      {/* Image Preview Modal */}
      {selectedImage && startPosition && (
        <div
          className={`fixed inset-0 z-50 ${isAnimating ? 'bg-black/90' : 'bg-transparent'} transition-colors duration-300`}
          onClick={handleClosePreview}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-opacity duration-300 z-[60]"
            onClick={handleClosePreview}
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <div
            className="fixed transition-all duration-300 ease-[cubic-bezier(.17,.67,.24,.98)]"
            style={{
              width: isAnimating ? calculateExpandedDimensions()?.width : startPosition.width,
              height: isAnimating ? calculateExpandedDimensions()?.height : startPosition.height,
              transform: isAnimating
                ? `translate3d(${calculateExpandedDimensions()?.x}px, ${calculateExpandedDimensions()?.y}px, 0)`
                : `translate3d(${startPosition.x}px, ${startPosition.y}px, 0)`,
            }}
          >
            <img
              src={thumbnailUrl.current}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
            />
            <img
              src={getImageUrl(selectedImage.image.uuid, 1200)}
              alt="Preview"
              className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
                showHighRes ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 