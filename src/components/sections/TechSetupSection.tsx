import React from 'react';
import { TechItem } from '../../data/profileData';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface TechSetupSectionProps {
  items: TechItem[];
}

const TechSetupSection: React.FC<TechSetupSectionProps> = ({ items }) => {
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

  // Generate consistent random values based on item id and name
  const getBackgroundStyles = (id: string, name: string) => {
    const seed = hashString(id + name + 'bg');
    const rotation = ((seed * 37) % 60) - 30; // -30 to 30 degrees
    const scale = 1.3 + ((seed * 13) % 50) / 100; // 1.3 to 1.8
    const offsetX = ((seed * 17) % 60) - 30; // -30% to 30%
    return {
      transform: `rotate(${rotation}deg) scale(${scale}) translateX(${offsetX}%)`,
    };
  };

  // Random rotations for the icon (default and hover) - ensures they're different
  const getIconStyles = (id: string, name: string) => {
    const seed = hashString(id + name + 'icon');
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
    <div className="section-card">
      <h2 className="section-title">Tech Setup</h2>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group relative flex items-center gap-2 p-2 rounded-lg
              bg-gradient-to-br ${item.color || 'from-gray-500/20 to-gray-600/20'}
              border border-white/5
              hover:border-white/20 hover:scale-[1.02]
              transition-all duration-300 ease-out
              cursor-pointer overflow-hidden
            `}
            style={getIconStyles(item.id, item.name)}
          >
            {/* Blurred background image */}
            <div 
              className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px) saturate(1.2)',
                ...getBackgroundStyles(item.id, item.name),
              }}
            />
            
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
            
            {/* Product Image */}
            <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center tech-icon-rotate">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Content */}
            <div className="relative flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white leading-tight truncate">
                {item.name}
              </h4>
              <p className="text-[10px] text-gray-400 leading-tight truncate">
                {item.spec}
              </p>
            </div>

            {/* Category tag on the side */}
            <span className="relative text-[8px] uppercase tracking-wider text-gray-500 font-medium px-1.5 py-0.5 bg-black/30 rounded flex-shrink-0 hidden md:inline">
              {item.category}
            </span>

            {/* External link indicator - width animation */}
            <div className="relative flex-shrink-0 w-0 group-hover:w-4 overflow-hidden transition-all duration-300 ease-out">
              <ArrowTopRightOnSquareIcon className="w-3 h-3 text-gray-400" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TechSetupSection;
