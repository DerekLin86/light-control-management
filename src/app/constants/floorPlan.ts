import { FloorPlanData, OccupancyStatus, SensorStatus } from '../types/floorPlan';
import { FloorPlan, Sensitivity } from '../types/floorPlan';
import { DeviceType } from '../types/deviceType';
import { DaylightType } from '../types/daylight';
import { Zone } from '../types/zone';

const DATA_NUMBER = 50;

export const MOCK_ZONE_DATA: Zone[] = Array.from({ length: DATA_NUMBER }, (_, i) => {
  return {
    buildingId: 100 + i,
    floorId: 10 + i,
    id: i,
    zId: 20 + i,
    zoneId: (20 + i).toString(),
    sorting: i,

    isOnline: (i + 1) % 2 === 0,
    name: `ZONE ${i}`,
    description: i === 2 ? 'A very loooooooooooooooooooooong description' : `Description ${i}`,
    zoneType: {
      isOutdoor: (i + 1) % 2 === 0,
      zoneOccMode: i,
      zoneDaylightMode: i,
      thirdPartyType: i,
      zoneTypeName: `${['A', 'B', 'C', 'D', 'E', 'F', 'G'][i % 7]}` as DeviceType,
    },
    haveOCC: (i + 1) % 2 === 1 ? 0 : 1,
    hasDaylight: (i + 1) % 2 === 1 ? 0 : 1,
    bypassOccupancySensor: (i + 1) % 2 === 1 ? 0 : 1,
    bypassOccupancySensorAt: new Date(),
    bypassDaylightSensor: (i + 1) % 2 === 1 ? 0 : 1,
    bypassDaylightSensorAt: new Date(),
    isCcmsZone: (i + 1) % 2 === 1 ? 0 : 1,
    isOn: (i + 1) % 2 === 1 ? 0 : 1,
    lightLevel: '100',
    Occupied: {},
    OccSensorEnable: {},
    occupancySensorTimeout: '15',
    ultraOccupancySensitivity: [Sensitivity.HIGH, Sensitivity.MED, Sensitivity.LOW][i % 3],
    DaylightSensorEnable: (i + 1) % 2 === 1 ? 0 : 1,
    targetLuxLevel: '5000',
    CcmsControlStatus: i,
    DaylightMinLevel: {},
    bypassTimeout: {},
    bypassTimeoutForDaylightSensor: {},
    bypassTimeoutForOccupancySensor: {},
    color: 'color',
    daylightCheckCycle: {},
    daylightDimmingCycle: {},
    daylightDimmingStep: {},
    daylightLuxReportStep: {},
    dimmingStatus: {},
    haveDimmer: (i + 1) % 2 === 1 ? 0 : 1,
    haveKeypad: (i + 1) % 2 === 1 ? 0 : 1,
    haveRelay: (i + 1) % 2 === 1 ? 0 : 1,
    lastOnlineUpdate: {},
    lastUpdate: {},
    luxLevel: {},
    luxOffset: {},
    minLuxLevel: {},
    occupied: {},
    pirOccupancySensitivity: {},
    pirVacancySensitivity: {},
    processorId: {},
    sensorEnable: {},
    sensorMode: {},
    targetOnLevel: {},
    ultraVacancySensitivity: {},
  };
});

export const MOCK_LIGHT_DATA: FloorPlanData[] = Array.from({ length: DATA_NUMBER }, (_, i) => {
  return {
    zoneStatus: (i + 1) % 2 === 0,
    zone: `ZONE ${i}`,
    description: i === 2 ? 'A very loooooooooooooooooooooong description' : `Description ${i}`,
    deviceType: `${['A', 'B', 'C', 'D', 'E', 'F', 'G'][i % 7]}` as DeviceType,
    enableSchedule: (i + 1) % 2 === 0,
    bypass: {
      enableBypass: (i + 1) % 2 === 0,
      bypassTimer: (i + 1) % 2 === 0 ? '0:00' : '1:00',
    },
    lightting: {
      status: (i + 1) % 2 === 0,
      ccmsControl: (i + 1) % 2 === 0,
      clmsControl: (i + 1) % 2 === 0,
      dimmingLevel: ((i + 1) % 10) * 10,
    },
    occupancy: {
      status: (i + 1) % 2 === 0 ? OccupancyStatus.ACC : OccupancyStatus.OCC,
      control: (i + 1) % 2 === 0,
      timeoutPeriod: `${(i + 1) % 10} min`,
      sensitivity: ['Low', 'Medium', 'High'][i % 3],
    },
    daylight: {
      status: (i + 1) % 2 === 0,
      control: (i + 1) % 2 === 0,
      targetLux: ['100 Lux', '200 Lux', '300 Lux', '400 Lux', '500 Lux'][i % 5],
      type: ['Indoor', 'Outdoor'][i % 2] as DaylightType,
    },
    indoorSensor: {
      status: (i + 1) % 2 === 1 ? SensorStatus.HIGH : SensorStatus.LOW,
      control: (i + 1) % 2 === 0,
      targetLux: `${(i + 1) % 100} lux`,
      bypass: (i + 1) % 2 === 0,
    },
    outdoorSensor: {
      status: i + (1 % 2) === 1 ? SensorStatus.HIGH : SensorStatus.LOW,
      control: i + (1 % 2) === 0,
      targetLux: `${(i + 1) % 100} lux`,
      bypass: (i + 1) % 2 === 0,
    },
  };
});

export const MOCK_FLOOR_PLAN_LIST: FloorPlan[] = Array.from({ length: DATA_NUMBER }, (_, i) => {
  return {
    label: i === 0 ? 'GF' : `${i}F`,
    planImageUrl: '/assets/images/floor-plan.png',
  };
});
