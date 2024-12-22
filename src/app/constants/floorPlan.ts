import { timeInterval } from 'rxjs';
import {FloorPlanData, OccupancyStatus, SensorStatus} from '../types/floorPlan'

const DATA_NUMBER = 10;

export const MOCK_LIGHT_DATA: FloorPlanData[] = Array.from({length: DATA_NUMBER}, (_, i) => {
  return {
    zone: `ZONE ${i}`,
    description: `Description ${i}`,
    lightting: {
      status: i+1 % 2 === 0,
      control: i+1 % 2 === 0,
      dimmingLevel: ((i + 1) % 10) * 10,
    },
    occupancy: {
      status: (i+1 % 2) === 1 ? OccupancyStatus.ACC : OccupancyStatus.OCC,
      control: i+1 % 2 === 0,
      timeoutPeriod: `${((i + 1) % 10)} min`,
      bypass: i+1 % 2 === 0,
    },
    indoorSensor: {
      status: (i+1 % 2) === 1 ? SensorStatus.HIGH : SensorStatus.LOW,
      control: i+1 % 2 === 0,
      targetLux: `${((i + 1) % 100)} lux`,
      bypass: i+1 % 2 === 0,
    },
    outdoorSensor: {
      status: (i+1 % 2) === 1 ? SensorStatus.HIGH : SensorStatus.LOW,
      control: i+1 % 2 === 0,
      targetLux: `${((i + 1) % 100)} lux`,
      bypass: i+1 % 2 === 0,
    }
  }
});
