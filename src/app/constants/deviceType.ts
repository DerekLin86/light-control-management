import {DeviceType} from '../types/deviceType';

export const DEVICE_TYPE_NAME_MAP = new Map<DeviceType, string>([
  [DeviceType.A, 'Photocell Daylight Sensor'],
  [DeviceType.B, 'Occupancy Sensors'],
  [DeviceType.C, 'CCMS Control'],
  [DeviceType.D, 'CCMS Control and Photocell Daylight Sensor'],
  [DeviceType.F, 'CLMS Control'],
  [DeviceType.G, 'Outdoor Photocell Daylight Sensor']
])

