import { Sensitivity } from '../types/floorPlan';

export const SENSITIVITY_DISPLAY_NAME_MAP = new Map<Sensitivity, string>([
  [Sensitivity.HIGH, 'High'],
  [Sensitivity.MED, 'Med'],
  [Sensitivity.LOW, 'Low'],
]);
