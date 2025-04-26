import { DaylightType } from '../types/daylight';

export interface FloorPlan {
  label: string;
  planImageUrl: string;
}

export interface BasicZoneSetting {
  zoneStatus: boolean;
  zone: string;
  description: string;
  deviceType: string;
  enableSchedule: boolean;
}

export interface BybassSettings {
  enableBypass: boolean;
  bypassTimer: string;
}

export interface LightingSetting {
  status: boolean;
  ccmsControl: boolean;
  clmsControl: boolean;
  dimmingLevel: number;
}

export interface OccupancySensor {
  status: OccupancyStatus;
  control: boolean;
  timeoutPeriod: string;
  sensitivity: string;
}

export interface Daylight {
  status: boolean;
  control: boolean;
  targetLux: string;
  type: DaylightType;
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
  bypass: BybassSettings;
  lightting: LightingSetting;
  occupancy: OccupancySensor;
  daylight: Daylight;
  indoorSensor: IndoorSensor;
  outdoorSensor: OutdorrSensor;
}

export enum OccupancyStatus {
  OCC = 'OCC',
  ACC = 'ACC',
}

export enum SensorStatus {
  HIGH = 'High',
  LOW = 'Low',
}

export enum Sensitivity {
  LOW,
  MED,
  HIGH,
}
