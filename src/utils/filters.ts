import { UnifiedTelemetryData, FilterState } from '../types/telemetry';

export function applyFilters(data: UnifiedTelemetryData[], filters: FilterState): UnifiedTelemetryData[] {
  return data.filter(item => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        item.device_id.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (item.status !== filters.status) return false;
    }

    // Temperature range filter
    if (filters.temperatureMin) {
      const tempMin = parseFloat(filters.temperatureMin);
      if (item.temperature < tempMin) return false;
    }
    if (filters.temperatureMax) {
      const tempMax = parseFloat(filters.temperatureMax);
      if (item.temperature > tempMax) return false;
    }

    // Duration range filter
    if (filters.durationMin) {
      const durMin = parseFloat(filters.durationMin);
      if (item.duration < durMin) return false;
    }
    if (filters.durationMax) {
      const durMax = parseFloat(filters.durationMax);
      if (item.duration > durMax) return false;
    }

    // Date range filter
    if (filters.dateFrom) {
      const dateFrom = new Date(filters.dateFrom);
      if (item.timestamp < dateFrom) return false;
    }
    if (filters.dateTo) {
      const dateTo = new Date(filters.dateTo);
      dateTo.setHours(23, 59, 59, 999); // End of day
      if (item.timestamp > dateTo) return false;
    }

    return true;
  });
}

export function getUniqueStatuses(data: UnifiedTelemetryData[]): string[] {
  const statuses = new Set(data.map(item => item.status));
  return Array.from(statuses).sort();
}