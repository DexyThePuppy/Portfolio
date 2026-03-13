import React from 'react';
import { InfoItem, StatCategory, TechItem, PlatformItem } from '../data/profileData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckBadgeIcon, GlobeAltIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { getIconStyles, getBackgroundStyles, GRAIN_TEXTURE_URL } from '../utils/visualUtils';
import { getSocialIcon, getSocialColors, getSocialDisplayName } from '../utils/socialNetworks';
import { CardSection, renderTechCard, renderPlatformCard } from './Cards';

// ============================================================================
// STATS SECTION – Card with header
// ============================================================================

interface StatsSectionProps {
  categories: StatCategory[];
}

const StatCategoryCard: React.FC<{ section: StatCategory }> = ({ section }) => {
  return (
    <div
      className="
        bg-surface-container-high rounded-xl overflow-hidden
        border border-[var(--color-primary-muted)]
        shadow-sm
      "
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
        <h3 className="text-sm font-semibold text-on-surface">{section.category}</h3>
      </div>

      <div className="px-2 pb-1.5 pt-1 space-y-0.5">
        {section.items.map((item, index) => {
          const isDarker = index % 2 === 1;
          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-all duration-200 ${
                isDarker ? 'bg-on-surface-5' : 'bg-transparent'
              } hover:bg-on-surface-10`}
            >
              <div
                className="flex-shrink-0 w-4 h-4 flex items-center justify-center"
                style={getIconStyles(item.id, item.title)}
              >
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-on-surface flex-1 min-w-0 truncate">{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StatsSection: React.FC<StatsSectionProps> = React.memo(({ categories }) => {
  return (
    <div className="space-y-3">
      {categories.map((section) => (
        <StatCategoryCard key={section.category} section={section} />
      ))}
    </div>
  );
});

StatsSection.displayName = 'StatsSection';

// ============================================================================
// HOBBIES SECTION – KinksTable-style expandable card
// ============================================================================

interface HobbiesSectionProps {
  items: InfoItem[];
}

const HobbiesCard: React.FC<{ items: InfoItem[] }> = ({ items }) => {
  return (
    <div
      className="
        bg-surface-container-high rounded-xl overflow-hidden
        border border-[var(--color-primary-muted)]
        shadow-sm
      "
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant rounded-t-xl">
        <h3 className="text-sm font-semibold text-on-surface">Hobbies & Skills</h3>
      </div>

      <div className="px-2 pb-1.5 pt-1 space-y-0.5">
        {items.map((hobby, index) => {
          const isDarker = index % 2 === 1;
          return (
            <div
              key={hobby.id}
              className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-all duration-200 ${
                isDarker ? 'bg-on-surface-5' : 'bg-transparent'
              } hover:bg-on-surface-10`}
            >
              <div
                className="flex-shrink-0 w-4 h-4 flex items-center justify-center"
                style={getIconStyles(hobby.id, hobby.title)}
              >
                <hobby.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-on-surface flex-1 min-w-0 truncate">{hobby.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const HobbiesSection: React.FC<HobbiesSectionProps> = React.memo(({ items }) => {
  return (
    <div className="mt-4">
      <HobbiesCard items={items} />
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
                border border-[var(--color-primary-muted)]
                hover:border-[var(--color-primary-30)] hover:scale-105
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
                  <span className="font-semibold text-on-surface text-xs truncate">
                    {getSocialDisplayName(account.socialNetwork)}
                  </span>
                  {account.isVerified && (
                    <CheckBadgeIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-on-surface-variant truncate block">
                  {account.value}
                </span>
              </div>

              {/* External link indicator - width animation */}
              <div className="relative flex-shrink-0 w-0 group-hover:w-4 overflow-hidden transition-all duration-300 ease-out">
                <ArrowTopRightOnSquareIcon className="w-3 h-3 text-on-surface-variant" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
});

SocialLinksSection.displayName = 'SocialLinksSection';
