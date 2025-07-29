import { UnifiedTelemetryData } from '../types/telemetry';

const STORAGE_KEY = 'telemetry_data';

export function saveTelemetryData(data: UnifiedTelemetryData[]): void {
  const existingData = getTelemetryData();
  const combinedData = [...existingData, ...data];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(combinedData));
}

export function getTelemetryData(): UnifiedTelemetryData[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const parsed = JSON.parse(stored);
    // Convert date strings back to Date objects
    return parsed.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
      start_time: new Date(item.start_time),
      end_time: new Date(item.end_time)
    }));
  } catch {
    return [];
  }
}

export function clearTelemetryData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportToCsv(data: UnifiedTelemetryData[]): void {
  const headers = [
    'Device ID',
    'Location',
    'Timestamp',
    'Start Time',
    'End Time',
    'Status',
    'Temperature',
    'Duration (min)',
    'Vibration'
  ];

  const rows = data.map(item => [
    item.device_id,
    item.location,
    item.timestamp.toISOString(),
    item.start_time.toISOString(),
    item.end_time.toISOString(),
    item.status,
    item.temperature.toString(),
    item.duration.toString(),
    item.vibration.toString()
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `telemetry_data_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}