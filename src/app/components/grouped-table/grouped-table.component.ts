import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { LightStatusComponent } from '../light-status/light-status.component';
import { MOCK_LIGHT_DATA } from '../../constants/floorPlan';
import { FloorPlanData, LightingSetting } from '../../types/floorPlan';
import { SliderTootgleFormcontrolComponent } from '../form/slider-toggle-formcontrol/slider-toggle-formcontrol.component';

@Component({
  selector: 'app-grouped-table',
  imports: [
    MatButtonModule,
    MatTableModule,
    LightStatusComponent,
    SliderTootgleFormcontrolComponent,
  ],
  standalone: true,
  templateUrl: './grouped-table.component.html',
  styleUrl: './grouped-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedTableComponent implements OnInit {
  readonly dataSource: FloorPlanData[] = MOCK_LIGHT_DATA;
  readonly basicZoneColumn = ['zone', 'description'];
  readonly lightingColumn = ['status', 'control', 'dimming'];
  readonly occupancyColumn = ['status', 'control', 'timeout', 'bypass'];
  readonly indoorColumn = ['status', 'control', 'targetLux', 'bypass'];
  readonly outdoorColumn = ['status', 'control', 'targetLux', 'bypass'];

  lightingCollapse = true;
  occupancyCollapse = true;
  indoorCollapse = true;
  outdoorCollapse = true;

  collapse = true;

  ngOnInit() {
    console.log(MOCK_LIGHT_DATA);
  }

  expandColumn(groupElement: Element) {
    groupElement.classList.add('.');
    console.log(groupElement);
  }

  toggleLightStatus(value: boolean, element: LightingSetting) {
    element.control = value;
  }
}
