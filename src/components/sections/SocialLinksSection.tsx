import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faInstagram,
  faDiscord,
  faSteam,
  faTelegram
} from '@fortawesome/free-brands-svg-icons';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { 
  CheckBadgeIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

interface SocialAccount {
  id: string;
  socialNetwork: string;
  isVerified: boolean;
  url: string;
  displayName: string;
  value: string;
  accessPermission: string;
}

interface SocialLinksSectionProps {
  accounts: SocialAccount[];
}

// Brand colors for each social network
const socialColors: Record<string, { gradient: string; icon: string; glow: string }> = {
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
  default: { 
    gradient: 'from-gray-500/20 to-gray-600/20',
    icon: 'text-gray-400',
    glow: '#888888'
  }
};

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ accounts }) => {
  // Random rotations for the icon (default and hover) - ensures they're different
  const getIconStyles = (id: string, network: string) => {
    const seed = hashString(id + network + 'icon');
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

  // Generate a better hash from string
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Generate random transform for background with offset
  const getBackgroundStyles = (id: string, network: string) => {
    const seed = hashString(id + network);
    const rotation = ((seed * 37) % 60) - 30; // -30 to 30 degrees
    const scale = 1.3 + ((seed * 13) % 50) / 100; // 1.3 to 1.8
    const offsetX = ((seed * 17) % 60) - 30; // -30% to 30%
    return {
      transform: `rotate(${rotation}deg) scale(${scale}) translateX(${offsetX}%)`,
    };
  };

  const getIcon = (socialNetwork: string) => {
    switch (socialNetwork.toLowerCase()) {
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
      default:
        return null;
    }
  };

  const getColors = (socialNetwork: string) => {
    return socialColors[socialNetwork.toLowerCase()] || socialColors.default;
  };

  const getDisplayName = (socialNetwork: string) => {
    const names: Record<string, string> = {
      twitter: 'Twitter / X',
      instagram: 'Instagram',
      discord: 'Discord',
      steam: 'Steam',
      telegram: 'Telegram',
      vrchat: 'VRChat',
    };
    return names[socialNetwork.toLowerCase()] || socialNetwork;
  };

  return (
    <div className="section-card">
      <h2 className="section-title">Social Links</h2>
      <div className="space-y-1.5">
        {accounts.map((account) => {
          const icon = getIcon(account.socialNetwork);
          const colors = getColors(account.socialNetwork);

          return (
            <a
              key={account.id}
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative flex items-center gap-2 p-2 rounded-lg
                bg-gradient-to-br ${colors.gradient}
                border border-white/5
                hover:border-white/20 hover:scale-[1.02]
                transition-all duration-300 ease-out
                cursor-pointer overflow-hidden
              `}
              style={getIconStyles(account.id, account.socialNetwork)}
            >
              {/* Blurred icon background */}
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center"
                style={{
                  filter: 'blur(12px) saturate(1.5)',
                  ...getBackgroundStyles(account.id, account.socialNetwork),
                }}
              >
                {icon && (
                  <FontAwesomeIcon 
                    icon={icon} 
                    className="w-24 h-24"
                    style={{ color: colors.glow }}
                  />
                )}
              </div>
              
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Grain texture overlay */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Container */}
              <div className={`
                relative w-10 h-10 rounded-lg flex items-center justify-center
                tech-icon-rotate
                ${colors.icon}
              `}>
                {icon ? (
                  <FontAwesomeIcon icon={icon} className="w-8 h-8 drop-shadow-lg" />
                ) : (
                  <GlobeAltIcon className="w-8 h-8 drop-shadow-lg" />
                )}
              </div>

              {/* Text Content */}
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white text-xs truncate">
                    {getDisplayName(account.socialNetwork)}
                  </span>
                  {account.isVerified && (
                    <CheckBadgeIcon className="w-3.5 h-3.5 text-[rgb(255,138,128)] flex-shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-gray-400 truncate block">
                  {account.value}
                </span>
              </div>

              {/* External link indicator - width animation */}
              <div className="relative flex-shrink-0 w-0 group-hover:w-4 overflow-hidden transition-all duration-300 ease-out">
                <ArrowTopRightOnSquareIcon className="w-3 h-3 text-gray-400" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksSection;
