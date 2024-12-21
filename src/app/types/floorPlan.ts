export interface BasicZoneSetting {
  zone: string;
  description: string;
}

export interface LightingSetting {
  status: boolean;
  control: boolean;
  dimmingLevel: number;
}

export interface OccupancySensor {
  status: OccupancyStatus;
  control: boolean;
  timeoutPeriod: string;
  bypass: boolean;
}

export interface IndoorSensor {
  status: SensorStatus;
  control: boolean;
  targetLux: string;
  bypass: boolean;
}

export interface OutdorrSensor {
  status: SensorStatus;
  control: boolean;
  targetLux: string;
  bypass: boolean;
}

export interface FloorPlanData extends BasicZoneSetting {
  lightting: LightingSetting;
  occupancy: OccupancySensor;
  indoorSensor: IndoorSensor;
  outdoorSensor: OutdorrSensor;
};

export enum OccupancyStatus {
  OCC = 'OCC',
  ACC = 'ACC'
}

export enum SensorStatus {
  HIGH = 'High',
  LOW = 'Low',
}
