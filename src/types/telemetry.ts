export interface RawTelemetryFile1 {
  deviceID: string;
  deviceType: string;
  location: string;
  timestamp: number;
  startTime: number;
  endTime: number;
  operationStatus: string;
  temp: number;
  vibration: number;
}

export interface RawTelemetryFile2 {
  device: {
    id: string;
    type: string;
  };
  startTime: string;
  endTime: string;
  timestamp: string;
  country: string;
  state: string;
  plant: string;
  block: string;
  data: {
    status: string;
    temperature: number;
    vibration: number;
  };
}

export interface UnifiedTelemetryData {
  id: string;
  device_id: string;
  location: string;
  timestamp: Date;
  start_time: Date;
  end_time: Date;
  status: string;
  temperature: number;
  duration: number;
  vibration: number;
  device_type: string;
}

export interface FilterState {
  search: string;
  status: string;
  temperatureMin: string;
  temperatureMax: string;
  durationMin: string;
  durationMax: string;
  dateFrom: string;
  dateTo: string;
}