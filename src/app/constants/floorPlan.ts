import { FloorPlanData, OccupancyStatus, SensorStatus } from '../types/floorPlan';
import { FloorPlan } from '../types/floorPlan';
import { DeviceType } from '../types/deviceType';
import { DaylightType } from '../types/daylight';

const DATA_NUMBER = 50;

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
