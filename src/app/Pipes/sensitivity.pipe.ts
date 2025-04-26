import { Pipe, type PipeTransform } from '@angular/core';

import { Sensitivity } from '../types/floorPlan';
import { SENSITIVITY_DISPLAY_NAME_MAP } from '../constants/sensitivity';

@Pipe({
  name: 'sensitivityToDisplayName',
})
export class SensitivityToDisplayNamePipes implements PipeTransform {
  transform(value: Sensitivity): string {
    return SENSITIVITY_DISPLAY_NAME_MAP.get(value) ?? '';
  }
}
