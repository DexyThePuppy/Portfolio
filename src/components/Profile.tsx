import React from 'react';
import { 
  MapPinIcon, 
  UserIcon, 
  StarIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  CheckBadgeIcon
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

  // Format biography sections
  const bioSections = profile.bio.biography.split('\n\n').map(section => section.trim());

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
                <div key={photo.id} className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={getImageUrl(photo.image.uuid)}
                    alt={`${profile.displayName}'s photo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
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
              <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
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