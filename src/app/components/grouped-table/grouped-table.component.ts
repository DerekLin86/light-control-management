import { ChangeDetectionStrategy, Component, OnInit, input, output, computed } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Zone } from '../../types/zone';
import { DateDiffPipe } from '../../Pipes/date-diff.pipe';
import { getCurrentDateString } from '../../utils/core/date_utils';
import { DeviceTypeToDisplayNamePipes } from '../../Pipes/device_type_pipes.pipe';
import { ScheduleStatusComponent } from '../schedule-status/schedule-status.component';
import { ZoneStatusComponent } from '../zone-status/zone-status.component';
import { LightStatusComponent } from '../light-status/light-status.component';
import { MOCK_LIGHT_DATA } from '../../constants/floorPlan';
import { FloorPlanData, LightingSetting, OccupancyStatus } from '../../types/floorPlan';
import { OccupancyChipComponent } from '../occupancy-chip/occupancy-chip.component';
import { SensitivityToDisplayNamePipes } from '../../Pipes/sensitivity.pipe';
import { DaylightStatusComponent } from '../daylight-status/daylight-status.component';
import { CountdownComponent } from '../countdown/countdown.component';
import { SliderTootgleFormcontrolComponent } from '../form/slider-toggle-formcontrol/slider-toggle-formcontrol.component';

@Component({
  selector: 'app-grouped-table',
  imports: [
    DeviceTypeToDisplayNamePipes,
    DaylightStatusComponent,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    LightStatusComponent,
    OccupancyChipComponent,
    ScheduleStatusComponent,
    SliderTootgleFormcontrolComponent,
    SensitivityToDisplayNamePipes,
    ZoneStatusComponent,
    CountdownComponent,
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

  // output
  setZoneBypassAllSensorOutput = output<Zone>({ alias: 'setZoneBypassAllSensor' });
  setIsCcmsStatusOutput = output<Zone>({ alias: 'setIsCcmsStatus' });
  setZoneOnOffOutput = output<Zone>({ alias: 'setZoneOnOff' });
  setOccSenorEnableOutput = output<Zone>({ alias: 'setOccSenorEnable' });
  setZoneDaylightSensorEnableOutput = output<Zone>({ alias: 'setZoneDaylightSensorEnable' });

  // Computed
  processData = computed(() => {
    const currentDate = new Date();
    return this.floorRawData().map(zoneData => {
      return {
        ...zoneData,
        hasOccupied: zoneData.haveOCC === 1,
        isCcmsZoneMode: zoneData.isCcmsZone === 1 && typeof zoneData.CcmsControlStatus === 'number',
      };
    });
  });

  // Type

  readonly occupancyStatus = OccupancyStatus;

  ngOnInit() {}

  expandColumn(groupElement: Element) {
    groupElement.classList.add('.');
  }

  toggleLightStatus(value: boolean, element: LightingSetting) {
    element.ccmsControl = value;
  }

  getBypassStatus(zone: Zone) {
    if (zone.haveOCC === 0 && !(zone.hasDaylight === 0)) {
      return zone.bypassOccupancySensor === 1;
    } else if (!(zone.haveOCC === 0) && zone.hasDaylight === 0) {
      return zone.bypassDaylightSensor === 1;
    } else {
      return zone.bypassOccupancySensor === 1 && zone.bypassDaylightSensor === 1;
    }
  }

  getBypasstimer(zone: Zone) {
    const currentDate = new Date();
    const dateDiffPipe = new DateDiffPipe();
    if (zone.haveOCC && !zone.hasDaylight) {
      return !!zone.bypassOccupancySensorAt
        ? dateDiffPipe.transform({
            start: new Date(zone.bypassOccupancySensorAt),
            end: currentDate,
          })
        : undefined;
    } else if (!zone.haveOCC && zone.hasDaylight) {
      return !!zone.bypassDaylightSensorAt
        ? dateDiffPipe.transform({ start: new Date(zone.bypassDaylightSensorAt), end: currentDate })
        : undefined;
    } else {
      return !!zone.bypassOccupancySensorAt
        ? dateDiffPipe.transform({
            start: new Date(zone.bypassOccupancySensorAt),
            end: currentDate,
          })
        : undefined;
    }
  }

  // Actions

  toggleBypassStatus(status: boolean, zone: Zone) {
    const currentDate = getCurrentDateString();

    const request: Zone = {
      ...zone,
      bypassAll: status ? 1 : 0,
      bypassOccupancySensor: status ? 1 : 0,
      bypassDaylightSensor: status ? 1 : 0,
      bypassAllAt: currentDate,
      bypassOccupancySensorAt: currentDate,
      bypassDaylightSensorAt: currentDate,
    };

    this.setZoneBypassAllSensorOutput.emit(request);
  }

  toggleCCMSStatus(status: boolean, zone: Zone) {
    const request: Zone = {
      ...zone,
      CcmsControlStatus: status ? 2 : 3,
      isOn: status ? 1 : 0,
      lightLevel: status ? zone.targetOnLevel : 0,
    };
    this.setIsCcmsStatusOutput.emit(request);
  }

  toggleZoneOnOff(status: boolean, zone: Zone) {
    const request: Zone = {
      ...zone,
      isOn: status ? 1 : 0,
      CcmsControlStatus: status ? 3 : 2,
      processorId: 0,
      lightLevel: zone.lightLevel,
    };
    this.setZoneOnOffOutput.emit(request);
  }

  toggleOccSensorEnable(status: boolean, zone: Zone) {
    const request: Zone = {
      ...zone,
      OccSensorEnable: status ? 1 : 0,
      processorId: 0,
    };

    this.setOccSenorEnableOutput.emit(request);
  }

  toggleDaylightSensorEnable(status: boolean, zone: Zone) {
    const request: Zone = {
      ...zone,
      DaylightSensorEnable: status ? 1 : 0,
      processorId: 0,
    };

    this.setZoneDaylightSensorEnableOutput.emit(request);
  }
}
