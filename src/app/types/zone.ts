import { DeviceType } from './deviceType';
import { Sensitivity } from './floorPlan';

export interface ServerZone {
  // Basic
  buildingId: number;
  floorId: number;
  id?: number;
  zId: number;
  zoneId?: string;
  sorting: number;

  isOnline?: boolean;
  name: string;
  description: string;
  zoneType: string;
  // schedule => not ready
  haveOCC: 0 | 1;
  hasDaylight: 0 | 1;
  bypassOccupancySensor?: any;
  bypassOccupancySensorAt?: any;
  bypassDaylightSensor: any;
  bypassDaylightSensorAt?: any;
  isCcmsZone?: 0 | 1;
  isOn?: 0 | 1;
  lightLevel?: any;
  Occupied?: any;
  OccSensorEnable?: any;
  occupancySensorTimeout?: string;
  ultraOccupancySensitivity?: Sensitivity;
  DaylightSensorEnable?: 0 | 1;
  targetLuxLevel?: string;

  // not use
  CcmsControlStatus: number;
  DaylightMinLevel?: any;
  bypassTimeout?: any;
  bypassTimeoutForDaylightSensor?: any;
  bypassTimeoutForOccupancySensor?: any;
  color: string;
  daylightCheckCycle?: any;
  daylightDimmingCycle?: any;
  daylightDimmingStep?: any;
  daylightLuxReportStep?: any;
  dimmingStatus?: any;
  haveDimmer: 0 | 1;
  haveKeypad: 0 | 1;
  haveRelay: 0 | 1;
  lastOnlineUpdate?: any;
  lastUpdate?: any;
  luxLevel?: any;
  luxOffset?: any;
  minLuxLevel?: any;
  occupied?: any;
  pirOccupancySensitivity?: any;
  pirVacancySensitivity?: any;
  processorId?: any;
  sensorEnable?: any;
  sensorMode?: any;
  targetOnLevel?: any;
  ultraVacancySensitivity?: any;
}

export interface Zone {
  // Basic
  buildingId: number;
  floorId: number;
  id?: number;
  zId: number;
  zoneId?: string;
  sorting: number;

  isOnline?: boolean;
  name: string;
  description: string;
  zoneType: {
    isOutdoor: boolean;
    zoneOccMode: number;
    zoneDaylightMode: number;
    thirdPartyType: number;
    zoneTypeName: DeviceType;
  };
  // schedule => not ready
  haveOCC: 0 | 1;
  hasDaylight: 0 | 1;
  bypassAll: 0 | 1;
  bypassAllAt?: Date;
  bypassAllEscapeSec?: number;
  bypassOccupancySensor?: 0 | 1;
  bypassOccupancySensorAt?: Date;
  bypassDaylightSensor: 0 | 1;
  bypassDaylightSensorAt?: Date;
  isCcmsZone?: 0 | 1;
  isOn?: 0 | 1;
  lightLevel?: any;
  Occupied?: any;
  OccSensorEnable?: any;
  occupancySensorTimeout?: string;
  ultraOccupancySensitivity?: Sensitivity;
  DaylightSensorEnable?: 0 | 1;
  targetLuxLevel?: string;

  // not use
  CcmsControlStatus: number;
  DaylightMinLevel?: any;
  bypassTimeout?: any;
  bypassTimeoutForDaylightSensor?: any;
  bypassTimeoutForOccupancySensor?: any;
  color: string;
  daylightCheckCycle?: any;
  daylightDimmingCycle?: any;
  daylightDimmingStep?: any;
  daylightLuxReportStep?: any;
  dimmingStatus?: any;
  haveDimmer: 0 | 1;
  haveKeypad: 0 | 1;
  haveRelay: 0 | 1;
  lastOnlineUpdate?: any;
  lastUpdate?: any;
  luxLevel?: any;
  luxOffset?: any;
  minLuxLevel?: any;
  occupied?: any;
  pirOccupancySensitivity?: any;
  pirVacancySensitivity?: any;
  processorId?: any;
  sensorEnable?: any;
  sensorMode?: any;
  targetOnLevel?: any;
  ultraVacancySensitivity?: any;
}
