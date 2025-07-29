import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FilterState } from '../types/telemetry';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableStatuses: string[];
  isDarkMode: boolean;
  onClearFilters: () => void;
}

export function FilterPanel({ 
  filters, 
  onFiltersChange, 
  availableStatuses, 
  isDarkMode,
  onClearFilters 
}: FilterPanelProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const inputClass = `w-full px-3 py-2 border rounded-md transition-colors ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
  } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`;

  const labelClass = `block text-sm font-medium mb-1 ${
    isDarkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <div className={`p-6 rounded-lg border ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Filters
          </h3>
        </div>
        
        <button
          onClick={onClearFilters}
          className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md transition-colors ${
            isDarkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <X className="h-4 w-4" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className={labelClass}>
            <Search className="h-4 w-4 inline mr-1" />
            Search
          </label>
          <input
            type="text"
            placeholder="Device ID or Location"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Status</label>
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className={inputClass}
          >
            <option value="">All Statuses</option>
            {availableStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Temperature Range */}
        <div>
          <label className={labelClass}>Temperature Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.temperatureMin}
              onChange={(e) => updateFilter('temperatureMin', e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.temperatureMax}
              onChange={(e) => updateFilter('temperatureMax', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Duration Range */}
        <div>
          <label className={labelClass}>Duration (min)</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.durationMin}
              onChange={(e) => updateFilter('durationMin', e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.durationMax}
              onChange={(e) => updateFilter('durationMax', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="md:col-span-2">
          <label className={labelClass}>Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
              className={inputClass}
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}