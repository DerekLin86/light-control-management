import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Zone } from '../../types/zone';
import { DeviceTypeToDisplayNamePipes } from '../../Pipes/device_type_pipes.pipe';
import { ScheduleStatusComponent } from '../schedule-status/schedule-status.component';
import { ZoneStatusComponent } from '../zone-status/zone-status.component';
import { LightStatusComponent } from '../light-status/light-status.component';
import { MOCK_LIGHT_DATA } from '../../constants/floorPlan';
import { FloorPlanData, LightingSetting } from '../../types/floorPlan';
import { OccupancyChipComponent } from '../occupancy-chip/occupancy-chip.component';
import { SensitivityToDisplayNamePipes } from '../../Pipes/sensitivity.pipe';
import { SliderTootgleFormcontrolComponent } from '../form/slider-toggle-formcontrol/slider-toggle-formcontrol.component';

@Component({
  selector: 'app-grouped-table',
  imports: [
    DeviceTypeToDisplayNamePipes,
    DatePipe,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    LightStatusComponent,
    OccupancyChipComponent,
    ScheduleStatusComponent,
    SliderTootgleFormcontrolComponent,
    SensitivityToDisplayNamePipes,
    ZoneStatusComponent,
  ],
  standalone: true,
  templateUrl: './grouped-table.component.html',
  styleUrl: './grouped-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedTableComponent implements OnInit {
  readonly dataSource: FloorPlanData[] = MOCK_LIGHT_DATA;
  readonly basicZoneColumn = ['zoneStatus', 'zone', 'description', 'type', 'enableSchedule'];
  readonly bypassColumn = ['enableBypass', 'bypassTimer'];
  readonly lightingColumn = ['status', 'ccmsControl', 'clmsControl', 'dimming'];
  readonly occupancyColumn = ['status', 'control', 'timeout', 'sensitivity'];
  readonly daylightColumn = ['status', 'control', 'targetLux', 'type'];

  // Collapse Settings
  bypassCollapse = true;
  lightingCollapse = true;
  occupancyCollapse = true;
  daylightCollapse = true;
  indoorCollapse = true;
  outdoorCollapse = true;
  collapse = true;

  // input
  floorRawData = input.required<Zone[]>();

  ngOnInit() {}

  expandColumn(groupElement: Element) {
    groupElement.classList.add('.');
  }

  toggleLightStatus(value: boolean, element: LightingSetting) {
    element.ccmsControl = value;
  }

  getBypassStatus(zone: Zone) {
    if (zone.haveOcc && !zone.hasDaylight) {
      return !!zone.bypassOccupancySensor;
    } else if (!zone.haveOcc && zone.hasDaylight) {
      return !!zone.bypassDaylightSensor;
    } else {
      return !!zone.bypassOccupancySensor && !!zone.bypassDaylightSensor;
    }
  }

  getBypasstimer(zone: Zone) {
    if (zone.haveOcc && !zone.hasDaylight) {
      return zone.bypassOccupancySensorAt;
    } else if (!zone.haveOcc && zone.hasDaylight) {
      return zone.bypassDaylightSensorAt;
    } else {
      return zone.bypassOccupancySensorAt;
    }
  }
}
