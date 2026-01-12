import { 
  faTwitter, 
  faInstagram,
  faDiscord,
  faSteam,
  faTelegram,
  faBluesky,
  faLastfm,
  faReddit,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Social network configuration
 */
interface SocialNetworkConfig {
  gradient: string;
  icon: string;
  glow: string;
}

/**
 * Brand colors for each social network
 */
export const SOCIAL_COLORS: Record<string, SocialNetworkConfig> = {
  twitter: { 
    gradient: 'from-[#1DA1F2]/30 to-[#0D8BD9]/20',
    icon: 'text-[#1DA1F2]',
    glow: '#1DA1F2'
  },
  instagram: { 
    gradient: 'from-[#F58529]/25 via-[#DD2A7B]/25 to-[#8134AF]/25',
    icon: 'text-[#DD2A7B]',
    glow: '#DD2A7B'
  },
  discord: { 
    gradient: 'from-[#5865F2]/30 to-[#4752C4]/20',
    icon: 'text-[#5865F2]',
    glow: '#5865F2'
  },
  steam: { 
    gradient: 'from-[#171A21]/40 to-[#66C0F4]/20',
    icon: 'text-[#66C0F4]',
    glow: '#66C0F4'
  },
  telegram: { 
    gradient: 'from-[#0088CC]/30 to-[#0077B5]/20',
    icon: 'text-[#0088CC]',
    glow: '#0088CC'
  },
  vrchat: { 
    gradient: 'from-[#0093D1]/30 to-[#0078A8]/20',
    icon: 'text-[#0093D1]',
    glow: '#0093D1'
  },
  bluesky: { 
    gradient: 'from-[#0085FF]/30 to-[#0066CC]/20',
    icon: 'text-[#0085FF]',
    glow: '#0085FF'
  },
  lastfm: { 
    gradient: 'from-[#D51007]/30 to-[#B90000]/20',
    icon: 'text-[#D51007]',
    glow: '#D51007'
  },
  reddit: { 
    gradient: 'from-[#FF4500]/30 to-[#CC3700]/20',
    icon: 'text-[#FF4500]',
    glow: '#FF4500'
  },
  barq: { 
    gradient: 'from-[#FF6A00]/30 to-[#CC5500]/20',
    icon: 'text-[#FF6A00]',
    glow: '#FF6A00'
  },
  github: { 
    gradient: 'from-[#6e5494]/30 to-[#24292e]/30',
    icon: 'text-[#f0f6fc]',
    glow: '#f0f6fc'
  },
  default: { 
    gradient: 'from-gray-500/20 to-gray-600/20',
    icon: 'text-gray-400',
    glow: '#888888'
  }
};

/**
 * Display names for social networks
 */
export const SOCIAL_DISPLAY_NAMES: Record<string, string> = {
  twitter: 'Twitter / X',
  instagram: 'Instagram',
  discord: 'Discord',
  steam: 'Steam',
  telegram: 'Telegram',
  vrchat: 'VRChat',
  bluesky: 'Bluesky',
  lastfm: 'Last.fm',
  reddit: 'Reddit',
  barq: 'Barq',
  github: 'GitHub',
};

/**
 * Get FontAwesome icon for a social network
 */
export const getSocialIcon = (socialNetwork: string): IconDefinition | null => {
  const network = socialNetwork.toLowerCase();
  
  switch (network) {
    case 'twitter':
      return faTwitter;
    case 'instagram':
      return faInstagram;
    case 'discord':
      return faDiscord;
    case 'steam':
      return faSteam;
    case 'telegram':
      return faTelegram;
    case 'vrchat':
      return faVrCardboard;
    case 'bluesky':
      return faBluesky;
    case 'lastfm':
      return faLastfm;
    case 'reddit':
      return faReddit;
    case 'github':
      return faGithub;
    default:
      return null;
  }
};

/**
 * Get color configuration for a social network
 */
export const getSocialColors = (socialNetwork: string): SocialNetworkConfig => {
  return SOCIAL_COLORS[socialNetwork.toLowerCase()] || SOCIAL_COLORS.default;
};

/**
 * Get display name for a social network
 */
export const getSocialDisplayName = (socialNetwork: string): string => {
  return SOCIAL_DISPLAY_NAMES[socialNetwork.toLowerCase()] || socialNetwork;
};

/**
 * Custom icon paths for social networks without FontAwesome icons
 */
export const SOCIAL_CUSTOM_ICONS: Record<string, string> = {
  barq: '/img/socials/barq.svg',
};

/**
 * Get custom icon path for a social network (if available)
 */
export const getSocialCustomIcon = (socialNetwork: string): string | null => {
  return SOCIAL_CUSTOM_ICONS[socialNetwork.toLowerCase()] || null;
};
