import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import {LightStatusComponent} from '../light-status/light-status.component';
import {MOCK_LIGHT_DATA} from '../../constants/floorPlan'
import {FloorPlanData} from '../../types/floorPlan';

@Component({
  selector: 'app-grouped-table',
  imports: [ MatButtonModule, MatTableModule, LightStatusComponent],
  standalone: true,
  templateUrl: './grouped-table.component.html',
  styleUrl: './grouped-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedTableComponent implements OnInit{
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
      console.log(MOCK_LIGHT_DATA)
  }

  expandColumn(groupElement: Element) {
    groupElement.classList.add('.')
    console.log(groupElement)
  }

}
