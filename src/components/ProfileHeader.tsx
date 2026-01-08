import React from 'react';
import { 
  MapPinIcon, 
  UserIcon, 
  StarIcon,
  HeartIcon,
  CakeIcon,
} from '@heroicons/react/24/outline';

interface ProfileHeaderProps {
  displayName: string;
  profileImageUrl: string;
  isVip: boolean;
  location: {
    region: string;
    country: string;
  };
  age: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  profileImageUrl,
  isVip,
  location,
  age,
}) => {
  // Generate a better hash from string
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  // Random rotations for the icon (default and hover) - ensures they're different
  const getIconStyles = (id: string, title: string) => {
    const seed = hashString(id + title + 'icon');
    const rotation = ((seed * 23) % 16) - 8; // -8 to 8 degrees

    // Ensure hover rotation is noticeably different (at least 8 degrees apart)
    let hoverRotation = ((seed * 41) % 20) - 10;
    const diff = Math.abs(hoverRotation - rotation);
    if (diff < 8) {
      hoverRotation = rotation > 0 ? rotation - 12 : rotation + 12;
    }

    return {
      '--icon-rotation': `${rotation}deg`,
      '--icon-hover-rotation': `${hoverRotation}deg`,
    } as React.CSSProperties;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8">
      <div className="relative -mt-28 sm:-mt-32 lg:-mt-36">
        <img
          src={profileImageUrl}
          alt={displayName}
          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl lg:rounded-3xl object-cover border-4 border-[rgb(255,138,128)] shadow-xl"
        />
        {isVip && (
          <div className="absolute -top-2 -right-2 bg-[rgb(255,138,128)] text-white p-1 rounded-full">
            <StarIcon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex-1 pb-4 text-center sm:text-left">
        <h1 className="text-3xl lg:text-5xl font-bold mb-2 mt-4 sm:mt-0 text-white">{displayName}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-gray-200 max-w-5xl">
          <div className="flex items-center gap-2 info-card group">
            <div
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles('location', `${location.region}, ${location.country}`)}
            >
              <MapPinIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
            </div>
            <span className="text-sm">{location.region}, {location.country}</span>
          </div>
          <div className="flex items-center gap-2 info-card group">
            <div
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles('age', `${age} years old`)}
            >
              <CakeIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
            </div>
            <span className="text-sm">{age} years old</span>
          </div>
          <div className="flex items-center gap-2 info-card group">
            <div
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles('gender', 'He/Him')}
            >
              <UserIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
            </div>
            <span className="text-sm">He/Him</span>
          </div>
          <div className="flex items-center gap-2 info-card group">
            <div
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles('orientation', 'Gay')}
            >
              <HeartIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
            </div>
            <span className="text-sm">Gay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
