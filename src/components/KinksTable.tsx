import React, { useRef, useMemo } from 'react';
import { getPleasureLabel, getKinkCategories, getKinksByCategory } from '../data/kinksData';

interface PleasureBadgeProps {
  value: number;
  compact?: boolean;
  /** When true, spans full Give+Recv width (96px) for single-player kinks */
  spanFull?: boolean;
}

/**
 * MD3 chip-style badge for pleasure level.
 * Uses corner-small (8px) shape per Material 3 chip spec.
 */
const PleasureBadge: React.FC<PleasureBadgeProps> = ({ value, compact = false, spanFull = false }) => {
  const { label, color, bgColor } = getPleasureLabel(value);
  const widthClass = spanFull ? 'w-[96px]' : compact ? 'w-[44px]' : 'w-[52px]';

  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-lg font-medium
        ${bgColor} ${color}
        ${compact ? 'px-2 py-0.5 text-[11px] font-semibold' : 'px-2.5 py-1 text-xs font-semibold'} ${widthClass}
        transition-all duration-200
      `}
      role="status"
    >
      {label}
    </span>
  );
};

interface KinkRowProps {
  displayName: string;
  pleasureGive: number;
  pleasureReceive: number;
  isSinglePlayer: boolean;
  index: number;
}

/**
 * MD3 list item style – surface-variant on hover, corner-medium shape.
 */
const KinkRow: React.FC<KinkRowProps> = ({
  displayName,
  pleasureGive,
  pleasureReceive,
  isSinglePlayer,
  index,
}) => {
  const isDarker = index % 2 === 1;
  return (
    <div
      className={`flex items-center justify-between py-1 px-3 rounded-lg transition-all duration-200 group ${
        isDarker ? 'bg-on-surface-5' : 'bg-transparent'
      } hover:bg-on-surface-10`}
    >
      <span className="text-sm text-on-surface flex-1 min-w-0 truncate pr-2">
        {displayName}
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        {isSinglePlayer || pleasureGive === pleasureReceive ? (
          <PleasureBadge value={pleasureGive} compact spanFull />
        ) : (
          <div className="flex items-center gap-2">
            <PleasureBadge value={pleasureGive} compact />
            <PleasureBadge value={pleasureReceive} compact />
          </div>
        )}
      </div>
    </div>
  );
};

interface CategorySectionProps {
  category: string;
}

/**
 * MD3 container card – surface-container-high, MD3 container header (no expander).
 */
const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const kinks = getKinksByCategory(category);
  const hasGiveRecv = kinks.some((k) => !k.kink.isSinglePlayer);

  return (
    <div className="bg-surface-container-high rounded-xl overflow-hidden border border-[var(--color-primary-muted)] shadow-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border-b border-outline-variant">
        <h3 className="text-sm font-semibold text-on-surface">{category}</h3>
        <span className="text-xs text-on-surface-variant">({kinks.length})</span>
      </div>

      <div className="px-2 pt-2 pb-2 space-y-0.5">
        {hasGiveRecv && (
          <div
            className="flex items-center justify-between py-0 px-3 text-[8px] text-on-surface-variant uppercase tracking-wider font-medium"
            aria-label="Give and Receive columns"
          >
            <span className="flex-1" aria-hidden />
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="w-[44px] text-center">Give</span>
              <span className="w-[44px] text-center">Recv</span>
            </div>
          </div>
        )}
        {kinks.map((kink, index) => (
          <KinkRow
            key={kink.kink.id}
            displayName={kink.kink.displayName}
            pleasureGive={kink.pleasureGive}
            pleasureReceive={kink.pleasureReceive}
            isSinglePlayer={kink.kink.isSinglePlayer}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const WaterfallMasonry: React.FC<{ categories: string[] }> = ({ categories }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const distributedCategories = useMemo(() => {
    if (typeof window === 'undefined') return [categories];

    const getColumnCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 4;
      if (width >= 1024) return 3;
      if (width >= 640) return 2;
      return 1;
    };

    const columnCount = getColumnCount();
    const columns: string[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights: number[] = Array(columnCount).fill(0);

    categories.forEach((category) => {
      const kinks = getKinksByCategory(category);
      const estimatedHeight = 48 + (kinks.length * 32);
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columns[shortestColumnIndex].push(category);
      columnHeights[shortestColumnIndex] += estimatedHeight;
    });

    return columns;
  }, [categories]);

  return (
    <div ref={containerRef} className="flex gap-3">
      {distributedCategories.map((columnCategories, columnIndex) => (
        <div key={`column-${columnIndex}`} className="flex-1 min-w-0 space-y-3">
          {columnCategories.map((category) => (
            <CategorySection key={category} category={category} />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * KinksTable – Material 3 Expressive layout.
 * Chip set legend + elevated card category sections.
 */
const KinksTable: React.FC = () => {
  const categories = getKinkCategories();

  return (
    <div className="space-y-3">
      <WaterfallMasonry categories={categories} />
    </div>
  );
};

export default KinksTable;
