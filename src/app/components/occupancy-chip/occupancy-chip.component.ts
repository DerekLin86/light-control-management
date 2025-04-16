import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { OccupancyStatus } from '../../types/floorPlan';

@Component({
  selector: 'app-occupancy-chip',
  imports: [],
  templateUrl: './occupancy-chip.component.html',
  styleUrl: './occupancy-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccupancyChipComponent {
  readonly status = input.required<OccupancyStatus>();
}
