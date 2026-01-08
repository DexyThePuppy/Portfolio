// Image Types
export interface UploadedImage {
  uuid: string;
  contentRating: string;
  width: number;
  height: number;
  blurHash: string;
}

export interface ProfileImage {
  id: string;
  image: UploadedImage;
  accessPermission: string;
  isAd: boolean;
}

// Location Types
export interface Place {
  region: string;
  country: string;
  countryCode: string;
}

export interface ProfileLocation {
  type: string;
  homePlace: Place;
  place: Place;
}

// Social Types
export interface SocialAccount {
  id: string;
  socialNetwork: string;
  isVerified: boolean;
  url: string;
  displayName: string;
  value: string;
  accessPermission: string;
}

// Species/Sona Types
export interface Species {
  id: string;
  displayName: string;
}

export interface Sona {
  id: string;
  displayName: string;
  hasFursuit: boolean;
  species: Species;
  images: ProfileImage[];
}

// Bio Types
export interface Bio {
  biography: string;
  genders: string[];
  languages: string[];
  relationshipStatus: string;
}

// Main Profile Type
export interface Profile {
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
  bio: Bio;
  socialAccounts: SocialAccount[];
  sonas?: Sona[];
}

// Section Data Types (used in profileData.ts)
export interface InfoItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

export interface StatCategory {
  category: string;
  items: InfoItem[];
}

export interface Language {
  id: string;
  name: string;
  flag: string;
}

// Modal Position Type
export interface StartPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX?: number;
  centerY?: number;
}
