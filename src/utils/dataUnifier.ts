import { RawTelemetryFile1, RawTelemetryFile2, UnifiedTelemetryData } from '../types/telemetry';

export function isFile1Format(data: any): data is RawTelemetryFile1 {
  return (
    typeof data.deviceID === 'string' &&
    typeof data.location === 'string' &&
    typeof data.timestamp === 'number' &&
    typeof data.operationStatus === 'string'
  );
}

export function isFile2Format(data: any): data is RawTelemetryFile2 {
  return (
    data.device &&
    typeof data.device.id === 'string' &&
    typeof data.startTime === 'string' &&
    data.data &&
    typeof data.data.status === 'string'
  );
}

export function unifyTelemetryData(rawData: RawTelemetryFile1 | RawTelemetryFile2): UnifiedTelemetryData {
  const id = Math.random().toString(36).substr(2, 9);

  if (isFile1Format(rawData)) {
    const startTime = new Date(rawData.startTime);
    const endTime = new Date(rawData.endTime);
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60); // duration in minutes

    return {
      id,
      device_id: rawData.deviceID,
      location: rawData.location,
      timestamp: new Date(rawData.timestamp),
      start_time: startTime,
      end_time: endTime,
      status: rawData.operationStatus,
      temperature: rawData.temp,
      duration,
      vibration: rawData.vibration,
      device_type: rawData.deviceType
    };
  } else {
    const startTime = new Date(rawData.startTime);
    const endTime = new Date(rawData.endTime);
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60); // duration in minutes
    const location = `${rawData.country}/${rawData.state}/${rawData.plant}/${rawData.block}`;

    return {
      id,
      device_id: rawData.device.id,
      location,
      timestamp: new Date(rawData.timestamp),
      start_time: startTime,
      end_time: endTime,
      status: rawData.data.status,
      temperature: rawData.data.temperature,
      duration,
      vibration: rawData.data.vibration,
      device_type: rawData.device.type
    };
  }
}

export function processUploadedFiles(files: File[]): Promise<UnifiedTelemetryData[]> {
  return Promise.all(
    files.map(file => {
      return new Promise<UnifiedTelemetryData[]>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const jsonData = JSON.parse(content);
            
            // Handle both single objects and arrays
            const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
            const unifiedData = dataArray.map(unifyTelemetryData);
            resolve(unifiedData);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      });
    })
  ).then(results => results.flat());
}