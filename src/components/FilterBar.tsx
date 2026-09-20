import React from 'react';
import type { FilterType } from '../types/todo';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
      <span className="font-medium text-slate-300">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      {/* Filter Buttons */}
      <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
        {filters.map((f) => {
          const isActive = currentFilter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onFilterChange(f.value)}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Clear Completed Button */}
      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-slate-400 hover:text-rose-400 disabled:opacity-40 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition font-medium cursor-pointer"
      >
        Clear completed ({completedCount})
      </button>
    </div>
  );
};
