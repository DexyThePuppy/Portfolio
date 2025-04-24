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
  const [selectedImage, setSelectedImage] = useState<ProfileImage | null>(null);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHighRes, setShowHighRes] = useState(false);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const thumbnailUrl = useRef<string>('');
  const scrollPosition = useRef(0);

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
    ],
    consoles: [
      { id: '1', title: 'PSP', icon: DeviceTabletIcon },
      { id: '2', title: 'PSVita', icon: DeviceTabletIcon },
      { id: '3', title: 'PS1', icon: DeviceTabletIcon },
      { id: '4', title: 'PS2', icon: DeviceTabletIcon },
      { id: '5', title: 'PS3', icon: DeviceTabletIcon },
      { id: '6', title: 'PS4', icon: DeviceTabletIcon },
      { id: '7', title: 'Wii', icon: DeviceTabletIcon },
      { id: '8', title: 'Wii U', icon: DeviceTabletIcon },
      { id: '9', title: '2x Nintendo DS Lite', icon: DeviceTabletIcon },
      { id: '10', title: 'Nintendo 3DS', icon: DeviceTabletIcon },
      { id: '11', title: 'Nintendo Switch', icon: DeviceTabletIcon }
    ]
  };

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
      {/* Banner Section */}
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
        {/* Profile Header with Avatar - Full Width on Desktop */}
        <div className="bg-gray-custom rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6">
          <div className="flex items-start gap-4 lg:block">
            <div className="relative -mt-10 lg:-mt-20">
              <img
                src={getImageUrl(profile.profileImage.image.uuid)}
                alt={profile.displayName}
                className="w-20 h-20 lg:w-32 lg:h-32 rounded-full lg:rounded-xl object-cover border-2 lg:border-4 border-secondary"
              />
            </div>
            <div className="flex-1 lg:mt-6">
              <div className="flex items-center gap-2 mb-6">
                <h1 className="text-xl lg:text-3xl font-bold">{profile.displayName}</h1>
                {isVip && <StarIcon className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" />}
              </div>

              {/* Location and Info */}
              <div className="space-y-3 text-[17px]">
                {/* Info Row */}
                <div className="flex flex-col sm:flex-row items-start gap-6 flex-wrap lg:flex-nowrap lg:justify-between">
                  {/* Home Location */}
                  <div className="flex items-center gap-2">
                    <HomeIcon className="w-5 h-5 text-white shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white">Austria</span>
                      <span className="text-gray-400 text-sm">Salzburg Region</span>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="flex items-center gap-2">
                    <CakeIcon className="w-5 h-5 text-white shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white">22 Years</span>
                      <span className="text-gray-400 text-sm">15.05.2002</span>
                    </div>
                  </div>

                  {/* Sexual Orientation */}
                  <div className="flex items-center gap-2">
                    <HeartIconSolid className="w-5 h-5 text-pink-500 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white">Gay Doggo</span>
                      <span className="text-gray-400 text-sm">Sexual Orientation</span>
                    </div>
                  </div>

                  {/* Relationship Status */}
                  <div className="flex items-center gap-2">
                    <HeartIcon className="w-5 h-5 text-red-500 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white">Dating</span>
                      <span className="text-gray-400 text-sm">Relationship Status</span>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-blue-500 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white">Male</span>
                      <span className="text-gray-400 text-sm">He/Him</span>
                    </div>
                  </div>

                  {/* Species */}
                  <div className="flex items-center gap-2">
                    <PaperAirplaneIcon className="w-5 h-5 text-purple-500 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white">Furry & Puppy</span>
                      <span className="text-gray-400 text-sm">Species</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-3">
            {/* Features */}
            <div className="bg-gray-custom rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Features</h2>
                </div>
                {statsInfo.map((section) => (
                  <div key={section.category} className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-400">{section.category}</h3>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 text-gray-300">
                          <item.icon className="w-5 h-5 min-w-[1.25rem] text-primary" />
                          <span className="text-sm truncate" title={item.title}>{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div className="bg-gray-custom rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Personality</h2>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                  {personalityTraits.map((trait) => (
                    <div key={trait.id} className="flex items-center gap-3 text-gray-300">
                      <trait.icon className="w-5 h-5 min-w-[1.25rem] text-primary" />
                      <span className="text-sm truncate" title={trait.title}>{trait.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Professional Skills & Hobbies */}
            <div className="bg-gray-custom rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6">
              <div className="space-y-6">
                {/* Professional Skills */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Professional</h2>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                    {professionalSkills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-3 text-gray-300">
                        <skill.icon className="w-5 h-5 min-w-[1.25rem] text-primary" />
                        <span className="text-sm truncate" title={skill.title}>{skill.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Hobbies */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Hobbies</h2>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                    {hobbies.map((hobby) => (
                      <div key={hobby.id} className="flex items-center gap-3 text-gray-300">
                        <hobby.icon className="w-5 h-5 min-w-[1.25rem] text-primary" />
                        <span className="text-sm truncate" title={hobby.title}>{hobby.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-gray-custom rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Languages</h2>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center gap-2 text-gray-300">
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Setup */}
            <div className="bg-gray-custom rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Tech Setup</h2>
                </div>
                {/* Gaming PC */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400">Gaming PC</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
                      <FontAwesomeIcon icon={faMemory} className="w-4 h-4" />
                      <span>Ryzen 9 7950x3D</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                      <FontAwesomeIcon icon={faDisplay} className="w-4 h-4" />
                      <span>RTX 4090</span>
                    </div>
                  </div>
                </div>

                {/* VR Setup */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400">VR Setup</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
                      <FontAwesomeIcon icon={faVrCardboard} className="w-4 h-4" />
                      <span>Quest 2</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400">
                      <FontAwesomeIcon icon={faGhost} className="w-4 h-4" />
                      <span>4x Trackers</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400">
                      <FontAwesomeIcon icon={faComputer} className="w-4 h-4" />
                      <span>2x Basestation</span>
                    </div>
                  </div>
                </div>

                {/* Computers */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400">Computers</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-500/20 text-gray-400">
                      <FontAwesomeIcon icon={faApple} className="w-4 h-4" />
                      <span>Macbook M1 Pro 14</span>
                    </div>
                  </div>
                </div>

                {/* Gaming Consoles */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400">Gaming Consoles</h3>
                  <div className="flex flex-wrap gap-2">
                    {techSetup.consoles.map((item) => {
                      let icon;
                      let colorClass;
                      
                      if (item.title.toLowerCase().includes('ps')) {
                        icon = "https://img.icons8.com/color/512/play-station.png";
                        colorClass = 'bg-red-500/20 text-red-400';
                      } else if (item.title.toLowerCase().includes('nintendo')) {
                        icon = "https://upload.wikimedia.org/wikipedia/commons/b/b3/Nintendo_red_logo.svg";
                        colorClass = 'bg-green-500/20 text-green-400';
                      } else if (item.title.toLowerCase().includes('wii')) {
                        icon = "https://upload.wikimedia.org/wikipedia/commons/b/b3/Nintendo_red_logo.svg";
                        colorClass = 'bg-blue-500/20 text-blue-400';
                      } else {
                        icon = faGamepad;
                        colorClass = 'bg-gray-500/20 text-gray-400';
                      }

                      return (
                      <div 
                        key={item.id} 
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
                        >
                          {typeof icon === 'string' ? (
                            <img src={icon} alt={item.title} className="w-4 h-4" />
                          ) : (
                            <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                          )}
                        <span>{item.title}</span>
                      </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-custom rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Social Links</h2>
                </div>
                <div className="space-y-3">
                  {/* Twitter (Verified) */}
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                    <div className="w-10 h-10 rounded-xl bg-[#1DA1F2]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faTwitter} className="w-5 h-5 text-[#1DA1F2]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Twitter</span>
                        <CheckBadgeIcon className="w-4 h-4 text-[#1DA1F2]" />
                      </div>
                      <span className="text-sm text-gray-400">@DexyThePuppy</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
                  </a>

                  {/* Last.fm (Verified) */}
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                    <div className="w-10 h-10 rounded-xl bg-[#D51007]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faLastfm} className="w-5 h-5 text-[#D51007]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Last.fm</span>
                        <CheckBadgeIcon className="w-4 h-4 text-[#D51007]" />
                      </div>
                      <span className="text-sm text-gray-400">DexyThePuppy</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
                  </a>

                  {/* Bluesky (Verified) */}
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                    <div className="w-10 h-10 rounded-xl bg-[#0085FF]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faBluesky} className="w-5 h-5 text-[#0085FF]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Bluesky</span>
                        <CheckBadgeIcon className="w-4 h-4 text-[#0085FF]" />
                      </div>
                      <span className="text-sm text-gray-400">Dexy</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
                  </a>

                  {/* Instagram */}
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                    <div className="w-10 h-10 rounded-xl bg-[#E4405F]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-[#E4405F]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Instagram</span>
                      </div>
                      <span className="text-sm text-gray-400">DexyThePuppy</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
                  </a>

                  {/* Telegram */}
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                    <div className="w-10 h-10 rounded-xl bg-[#26A5E4]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faTelegram} className="w-5 h-5 text-[#26A5E4]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Telegram</span>
                      </div>
                      <span className="text-sm text-gray-400">DexyThePuppy</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
                  </a>

                  {/* Discord */}
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                    <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faDiscord} className="w-5 h-5 text-[#5865F2]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Discord</span>
                      </div>
                      <span className="text-sm text-gray-400">DexyThePuppy</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
                  </a>

                  {/* Steam */}
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition">
                    <div className="w-10 h-10 rounded-xl bg-[#000000]/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faSteam} className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Steam</span>
                      </div>
                      <span className="text-sm text-gray-400">DexyThePuppy</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Photo Grid */}
          <div className="lg:col-span-9 mt-6 lg:mt-0">
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {publicImages.map((photo, index) => (
                <div 
                  key={photo.id} 
                  ref={el => imageRefs.current[`image-${index}`] = el}
                  className="aspect-square rounded-lg lg:rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
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
    </div>
  );
};

export default Profile; 