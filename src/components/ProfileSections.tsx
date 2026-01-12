import React from 'react';
import { InfoItem, StatCategory, Language, TechItem, PlatformItem } from '../data/profileData';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckBadgeIcon, GlobeAltIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { getIconStyles, getBackgroundStyles, GRAIN_TEXTURE_URL } from '../utils/visualUtils';
import { getSocialIcon, getSocialColors, getSocialDisplayName } from '../utils/socialNetworks';
import { CardSection, renderTechCard, renderPlatformCard } from './Cards';

// ============================================================================
// ABOUT SECTION
// ============================================================================

interface AboutSectionProps {
  items: InfoItem[];
  languages?: Language[];
}

export const AboutSection: React.FC<AboutSectionProps> = React.memo(({ items, languages }) => {
  return (
    <div className="section-card">
      <h2 className="section-title">About</h2>
      <div className="grid grid-cols-1 gap-0.5">
        {items.map((info) => (
          <div
            key={info.id}
            className="flex items-center gap-2.5 p-2 bg-black/15 backdrop-blur-sm rounded-md border border-[rgb(255,138,128)]/5 hover:border-[rgb(255,138,128)]/20 transition-all duration-300 group"
          >
            <div
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles(info.id, info.title)}
            >
              <info.icon className="w-4 h-4 text-[rgb(255,138,128)]" />
            </div>
            <span className="section-text text-xs font-medium">{info.title}</span>
          </div>
        ))}

        {/* Languages as compact inline badges */}
        {languages && languages.length > 0 && (
          <div className="flex items-center gap-2.5 p-2 bg-black/15 backdrop-blur-sm rounded-md border border-[rgb(255,138,128)]/5 hover:border-[rgb(255,138,128)]/20 transition-all duration-300 group">
            <div
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles('languages', 'Languages')}
            >
              <LanguageIcon className="w-4 h-4 text-[rgb(255,138,128)]" />
            </div>
            <div className="flex flex-wrap gap-1">
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[rgb(255,138,128)]/10 text-[rgb(255,138,128)] text-xs font-medium rounded"
                >
                  {lang.flag} {lang.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

AboutSection.displayName = 'AboutSection';

// ============================================================================
// STATS SECTION
// ============================================================================

interface StatsSectionProps {
  categories: StatCategory[];
}

export const StatsSection: React.FC<StatsSectionProps> = React.memo(({ categories }) => {
  return (
    <div className="section-card">
      <h2 className="section-title">Stats</h2>
      <div className="space-y-2">
        {categories.map((section) => (
          <div key={section.category}>
            <h3 className="text-xs font-semibold text-[rgb(255,138,128)] mb-2 flex items-center gap-1.5">
              <div className="w-1 h-1 bg-[rgb(255,138,128)] rounded-full"></div>
              {section.category}
            </h3>
            <div className="grid gap-0.5">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-1.5 bg-black/15 backdrop-blur-sm rounded-md border border-[rgb(255,138,128)]/5 hover:border-[rgb(255,138,128)]/20 transition-all duration-300 group"
                >
                  <div
                    className="flex-shrink-0 w-4 h-4 flex items-center justify-center tech-icon-rotate"
                    style={getIconStyles(item.id, item.title)}
                  >
                    <item.icon className="w-4 h-4 text-[rgb(255,138,128)]" />
                  </div>
                  <span className="section-text text-xs font-medium flex-1">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

StatsSection.displayName = 'StatsSection';

// ============================================================================
// HOBBIES SECTION
// ============================================================================

interface HobbiesSectionProps {
  items: InfoItem[];
}

export const HobbiesSection: React.FC<HobbiesSectionProps> = React.memo(({ items }) => {
  return (
    <div className="section-card">
      <h2 className="section-title">Hobbies & Skills</h2>
      <div className="flex flex-wrap gap-1.5">
        {items.map((hobby) => (
          <div
            key={hobby.id}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-black/15 backdrop-blur-sm rounded-md border border-[rgb(255,138,128)]/5 hover:border-[rgb(255,138,128)]/20 transition-all duration-300 hover:scale-105 group"
          >
            <div
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center tech-icon-rotate"
              style={getIconStyles(hobby.id, hobby.title)}
            >
              <hobby.icon className="w-4 h-4 text-[rgb(255,138,128)]" />
            </div>
            <span className="section-text text-xs font-medium">{hobby.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

HobbiesSection.displayName = 'HobbiesSection';

// ============================================================================
// TECH SETUP SECTION
// ============================================================================

interface TechSetupSectionProps {
  items: TechItem[];
}

export const TechSetupSection: React.FC<TechSetupSectionProps> = ({ items }) => (
  <CardSection
    title="Tech Setup"
    items={items}
    gridClassName="grid grid-cols-2 lg:grid-cols-1 gap-1.5"
    renderCard={renderTechCard}
  />
);

// ============================================================================
// PLATFORMS SECTION
// ============================================================================

interface PlatformsSectionProps {
  items: PlatformItem[];
}

export const PlatformsSection: React.FC<PlatformsSectionProps> = ({ items }) => (
  <CardSection
    title="VR Platforms"
    items={items}
    renderCard={renderPlatformCard}
  />
);

// ============================================================================
// SOCIAL LINKS SECTION
// ============================================================================

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

export const SocialLinksSection: React.FC<SocialLinksSectionProps> = React.memo(({ accounts }) => {
  return (
    <div className="section-card">
      <h2 className="section-title">Social Links</h2>
      <div className="space-y-1.5">
        {accounts.map((account) => {
          const icon = getSocialIcon(account.socialNetwork);
          const colors = getSocialColors(account.socialNetwork);

          return (
            <a
              key={account.id}
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative flex items-center gap-2 p-2 rounded-xl
                bg-gradient-to-br ${colors.gradient}
                border border-[rgb(255,138,128)]/10
                hover:border-[rgb(255,138,128)]/30 hover:scale-105
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
                style={{ backgroundImage: GRAIN_TEXTURE_URL }}
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
                    {getSocialDisplayName(account.socialNetwork)}
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
});

SocialLinksSection.displayName = 'SocialLinksSection';
