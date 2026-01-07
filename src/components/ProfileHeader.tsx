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
    place: string;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-gray-200 max-w-5xl">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
            <span>{location.place}, {location.country}</span>
          </div>
          <div className="flex items-center gap-2">
            <CakeIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
            <span>{age} years old</span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
            <span>He/Him</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartIcon className="w-5 h-5 text-[rgb(255,138,128)]" />
            <span>Gay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
