import { Pipe, type PipeTransform } from '@angular/core';
import { DeviceType } from '../types/deviceType';

export const DEVICE_TYPE_DISPLAY_NAME_MAPPING = new Map<DeviceType, string>([
  [DeviceType.A, 'Photocell Daylight Sensor'],
  [DeviceType.B, 'Occupancy Sensor'],
  [DeviceType.C, 'CCMS Control'],
  [DeviceType.D, 'CCMS Control and Photocell Daylight Sensor'],
  [DeviceType.E, 'Occupany Sensor and Photocell Daylight Sensor'],
  [DeviceType.F, 'CLMS Control'],
  [DeviceType.G, 'Outdoor Photocell Daylight Sensor'],
]);

@Pipe({
  name: 'deviceTypeToDisplayName',
})
export class DeviceTypeToDisplayNamePipes implements PipeTransform {
  transform(value: DeviceType): string {
    return DEVICE_TYPE_DISPLAY_NAME_MAPPING.get(value) ?? '';
  }
}
