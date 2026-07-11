import React, { useEffect, useRef, useState } from 'react';
import {
  MapPinIcon,
  CakeIcon,
  SparklesIcon,
  UserGroupIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import type { Language } from '../data/profileData';

// Strip decorative separator/header lines from the raw biography text
const getBioLines = (biography: string): string[] =>
  biography
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('━') && !line.startsWith('𝗠'));

// Only the short intro is shown – the rest of the raw bio is intentionally dropped
const BIO_LINES = 2;

interface ProfileHeaderProps {
  displayName: string;
  profileImageUrl: string;
  biography: string;
  location: {
    region: string;
    country: string;
  };
  age: number;
  species: string;
  relationshipStatus: string;
  personality: string;
  languages: Language[];
}

const textShadow = '[text-shadow:0_1px_8px_rgba(0,0,0,0.7)]';
const titleShadow = '[text-shadow:0_2px_12px_rgba(0,0,0,0.7)]';

/**
 * Profile header on the banner – same layout at every viewport:
 *   avatar | name     | bio line 1 (right)
 *   avatar | location | bio line 2 (right)
 *   avatar | badges
 * Flex-based so the bio block's height never stretches the name/location rows.
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = React.memo(({
  displayName,
  profileImageUrl,
  biography,
  location,
  age,
  species,
  relationshipStatus,
  personality,
  languages: langs,
}) => {
  const chip =
    'inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container/90 border border-[var(--color-primary-muted)] text-xs font-semibold text-on-surface whitespace-nowrap';

  const bioLines = getBioLines(biography).slice(0, BIO_LINES);

  // Bio lines are kept on a single line (nowrap). If a line would overflow its
  // column, the whole bio is hidden instead of wrapping or truncating.
  const bio0Ref = useRef<HTMLParagraphElement>(null);
  const bio1Ref = useRef<HTMLParagraphElement>(null);
  const [bioFits, setBioFits] = useState(true);

  useEffect(() => {
    const els = [bio0Ref.current, bio1Ref.current].filter(
      (el): el is HTMLParagraphElement => el !== null,
    );
    if (els.length === 0) return;

    const check = () => {
      // +1 tolerance for subpixel rounding
      setBioFits(els.every((el) => el.scrollWidth <= el.clientWidth + 1));
    };
    check();

    const ro = new ResizeObserver(check);
    els.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [bioLines.length]);

  // Keep rendered (invisible) so we can re-measure when space opens up again
  const bioClass = `flex-1 min-w-0 text-white/85 text-sm flex items-center justify-end gap-1.5 truncate text-right whitespace-nowrap overflow-hidden ${
    bioFits ? '' : 'invisible'
  } ${textShadow}`;

  const badges = (
    <>
      <span className={chip}>
        <HeartIcon className="w-3 h-3 text-primary" />
        {relationshipStatus}
      </span>
      <span className={chip}>
        <CakeIcon className="w-3 h-3 text-secondary" />
        {age} years
      </span>
      <span className={chip}>🏳️‍🌈 Gay</span>
      <span className={chip}>
        <UserGroupIcon className="w-3 h-3 text-tertiary" />
        {personality}
      </span>
      <span className={chip}>
        <SparklesIcon className="w-3 h-3 text-primary" />
        {species}
      </span>
      {langs.map((lang) => (
        <span key={lang.id} className={chip}>
          {lang.flag} {lang.name}
        </span>
      ))}
    </>
  );

  return (
    <header className="flex items-start gap-x-5 overflow-x-clip">
      <img
        src={profileImageUrl}
        alt={displayName}
        className="shrink-0 w-24 h-24 rounded-2xl object-cover border-[3px] border-primary shadow-xl"
      />

      <div className="min-w-0 flex-1">
        {/* Row 1: name | bio line 1 filling the rest of the row */}
        <div className="flex items-center gap-x-5 min-w-0">
          <h1 className={`shrink-0 max-w-full text-3xl font-bold text-white leading-tight truncate ${titleShadow}`}>
            {displayName}
          </h1>
          {bioLines[0] && (
            <p ref={bio0Ref} className={bioClass}>
              {bioLines[0]}
            </p>
          )}
        </div>

        {/* Row 2: location | bio line 2 filling the rest of the row */}
        <div className="mt-1 flex items-center gap-x-5 min-w-0">
          <p className={`shrink-0 max-w-full text-white/85 text-sm flex items-center gap-1.5 truncate ${textShadow}`}>
            <MapPinIcon className="w-4 h-4 shrink-0" />
            {location.region}, {location.country}
          </p>
          {bioLines[1] && (
            <p ref={bio1Ref} className={bioClass}>
              {bioLines[1]}
            </p>
          )}
        </div>

        {/* Row 3: badges */}
        <div className="mt-2 w-fit max-w-full flex flex-nowrap gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          {badges}
        </div>
      </div>
    </header>
  );
});

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;
