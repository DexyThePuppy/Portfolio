import React, { useState, useRef, useMemo } from 'react';
import { getPleasureLabel, getKinkCategories, getKinksByCategory } from '../data/kinksData';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PleasureBadgeProps {
  value: number;
  compact?: boolean;
}

const PleasureBadge: React.FC<PleasureBadgeProps> = ({ value, compact = false }) => {
  const { label, color, bgColor } = getPleasureLabel(value);

  return (
    <span className={`
      inline-flex items-center justify-center rounded-md font-medium
      ${bgColor} ${color}
      ${compact ? 'px-1.5 py-0.5 text-[10px] w-[36px]' : 'px-2 py-1 text-xs w-[44px]'}
    `}>
      {label}
    </span>
  );
};

interface KinkRowProps {
  displayName: string;
  pleasureGive: number;
  pleasureReceive: number;
  isSinglePlayer: boolean;
}

const KinkRow: React.FC<KinkRowProps> = ({ displayName, pleasureGive, pleasureReceive, isSinglePlayer }) => {
  return (
    <div className="flex items-center justify-between py-2 px-3 hover:bg-white/5 rounded-lg transition-colors group">
      <span className="text-sm text-white/90 group-hover:text-white transition-colors flex-1 min-w-0 truncate pr-2">
        {displayName}
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        {isSinglePlayer ? (
          <PleasureBadge value={pleasureGive} compact />
        ) : (
          <>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[8px] text-white/40 uppercase tracking-wider">Give</span>
              <PleasureBadge value={pleasureGive} compact />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[8px] text-white/40 uppercase tracking-wider">Recv</span>
              <PleasureBadge value={pleasureReceive} compact />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface CategorySectionProps {
  category: string;
  defaultOpen?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const kinks = getKinksByCategory(category);
  
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronDownIcon className="w-4 h-4 text-[rgb(255,138,128)]" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-white/50" />
          )}
          <h3 className="text-sm font-semibold text-white">{category}</h3>
          <span className="text-xs text-white/40">({kinks.length})</span>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-2 pb-2 space-y-0.5">
          {kinks.map((kink) => (
            <KinkRow
              key={kink.kink.id}
              displayName={kink.kink.displayName}
              pleasureGive={kink.pleasureGive}
              pleasureReceive={kink.pleasureReceive}
              isSinglePlayer={kink.kink.isSinglePlayer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const WaterfallMasonry: React.FC<{ categories: string[] }> = ({ categories }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const distributedCategories = useMemo(() => {
    if (typeof window === 'undefined') return [categories]; // SSR fallback

    const getColumnCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 4; // xl
      if (width >= 1024) return 3; // lg
      if (width >= 640) return 2;  // sm
      return 1; // mobile
    };

    const columnCount = getColumnCount();
    const columns: string[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights: number[] = Array(columnCount).fill(0);

    // Estimate heights and distribute items
    categories.forEach((category) => {
      const kinks = getKinksByCategory(category);
      // Rough height estimation: header + items * item height
      const estimatedHeight = 48 + (kinks.length * 32); // header ~48px, each item ~32px

      // Find shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

      columns[shortestColumnIndex].push(category);
      columnHeights[shortestColumnIndex] += estimatedHeight;
    });

    return columns;
  }, [categories]);

  return (
    <div ref={containerRef} className="flex gap-3">
      {distributedCategories.map((columnCategories, columnIndex) => (
        <div key={`column-${columnIndex}`} className="flex-1 space-y-3">
          {columnCategories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              defaultOpen={true}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const KinksTable: React.FC = () => {
  const categories = getKinkCategories();

  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-black/20 rounded-xl border border-white/10">
        <span className="text-xs text-white/50 mr-1">Legend:</span>
        <div className="flex items-center gap-1.5">
          <PleasureBadge value={2} compact />
          <span className="text-xs text-white/50">Favorite</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PleasureBadge value={1} compact />
          <span className="text-xs text-white/50">Yes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PleasureBadge value={0} compact />
          <span className="text-xs text-white/50">Maybe</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PleasureBadge value={-1} compact />
          <span className="text-xs text-white/50">No</span>
        </div>
      </div>

      {/* Waterfall Masonry Layout */}
      <WaterfallMasonry categories={categories} />
    </div>
  );
};

export default KinksTable;
