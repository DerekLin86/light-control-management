import { FloorPlanData, OccupancyStatus, SensorStatus } from '../types/floorPlan';
import { FloorPlan } from '../types/floorPlan';

const DATA_NUMBER = 10;

export const MOCK_LIGHT_DATA: FloorPlanData[] = Array.from({ length: DATA_NUMBER }, (_, i) => {
  return {
    zone: `ZONE ${i}`,
    description: `Description ${i}`,
    lightting: {
      status: (i + 1) % 2 === 0,
      control: (i + 1) % 2 === 0,
      dimmingLevel: ((i + 1) % 10) * 10,
    },
    occupancy: {
      status: (i + 1) % 2 === 0 ? OccupancyStatus.ACC : OccupancyStatus.OCC,
      control: (i + 1) % 2 === 0,
      timeoutPeriod: `${(i + 1) % 10} min`,
      bypass: (i + 1) % 2 === 0,
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
    label: `${i + 1}F`,
    planImageUrl:
      'https://s3-alpha-sig.figma.com/img/1e7e/3216/f82efac9c42db4f0941253d2eae55498?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Oob96qRfsZMLhYB26oRmlnvhrt7Z-M2QwzRFhnYXAOXAAYIUlM5vPjkH5IzudEkn4RQRXQ~U6cyTlmfE-4Gj-3Dnvayp0NuCLTfBwpIlIiQjcNCXOlgFy3iXuOu04cx2W3wOX5LrRpABU7M5jkKs2fhgp67BjxZJW23YFEv4RAvJWh2gOePMHhwiD905wbbFoBSQrPiqvt3o2AxK1fPEC5Yja6vz5XFcEFhSFXzDvLNQsx3rlbHlVomYxGzBTvVCmqy6d6tQtJ3YJRH5wG60HcvZznik0dmswpXUyn22gnBdhPaBpID4i2a4-gqKEi-vHGHAqX71kmJtA~wz5LkCjg__',
  };
});
