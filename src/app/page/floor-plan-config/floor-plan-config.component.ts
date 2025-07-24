import {
  AfterViewInit,
  Component,
  ChangeDetectorRef,
  OnInit,
  effect,
  inject,
  OnDestroy,
  ViewChild,
  ElementRef,
  signal,
} from '@angular/core';
import { BehaviorSubject, fromEvent, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, startWith, first, map, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { FloorPlanService } from '../../services/floorPlan.service';
import { GroupedTableComponent } from '../../components/grouped-table/grouped-table.component';
import { FloorPlanSwitcherComponent } from '../../components/floor-plan-switcher/floor-plan-switcher.component';
import { WebsocketService, RECEIVE_MESSAGE } from '../../services/websocket.service';
import { FloorPlan as FloorPlanServer } from '../../types/floorPlan-service';
import { getCurrentDateString } from '../../utils/core/date_utils';
import { normalizeFloorPlanData } from '../../utils/floor-plan/floor-plan-utils';
import { Zone } from '../../types/zone';

@Component({
  selector: 'app-floor-plan-config',
  imports: [FloorPlanSwitcherComponent, GroupedTableComponent],
  templateUrl: './floor-plan-config.component.html',
  styleUrl: './floor-plan-config.component.scss',
})
export class FloorPlanConfigComponent implements AfterViewInit, OnInit, OnDestroy {
  private readonly floorPlanService = inject(FloorPlanService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly websocketService = inject(WebsocketService);
  private readonly changeDetectionRef = inject(ChangeDetectorRef);

  readonly selectedFloorPlan = new FormControl<FloorPlanServer | null>(null);

  protected readonly floorPlanList$ = new BehaviorSubject<FloorPlanServer[]>([]);
  protected readonly floorRawData = signal<Zone[]>([]);

  readonly GAP = 32; //px
  marginWidth = 0;
  currentFloorPlan = '';

  @ViewChild(FloorPlanSwitcherComponent, { read: ElementRef })
  floorPlanSwitcherElement!: ElementRef;

  constructor() {
    effect(() => {
      this.flushZoneOnOff(this.websocketService.zoneOnOffStatusListensor());
    });

    effect(() => {
      this.flushBypassStatus(this.websocketService.bypassAllSensorListensor());
    });

    effect(() => {
      this.flushLightLevelStatus(this.websocketService.lightLevelStatusListensor());
    });

    effect(() => {
      this.flushZoneOccupiedStatusListensor(this.websocketService.zoneOccupiedStatusListensor());
    });

    effect(() => {
      this.flushZoneBypassOccSensorStatus(
        this.websocketService.zoneBypassOccSensorStatusListensor()
      );
    });

    effect(() => {
      this.flushZoneBypassDaylightSensorStatus(
        this.websocketService.zoneBypassDaylightSensorStatusListensor()
      );
    });

    effect(() => {
      this.flushOccSensorEnableStatus(this.websocketService.zoneOccSensorEanbleStatusListensor());
    });

    effect(() => {
      this.flushDaylightSensorEnableStatus(
        this.websocketService.zoneDaylightSensorEnableStatusListensor()
      );
    });

    effect(() => {
      this.flushZoneCcmsControlStatus(this.websocketService.zoneCcmsControlStatusListensor());
    });
  }

  ngOnInit(): void {
    this.registerSelectedFloorListener();
    this.fetchFloorPlanList();
    this.registerResizeListener();
    this.websocketService.connect();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateMargin();
    }, 500);
  }

  ngOnDestroy(): void {
    this.websocketService.close();
  }

  selectFloorPlan(floorPlan: FloorPlanServer | null) {
    this.currentFloorPlan = floorPlan?.name ?? '';
    this.updateMargin();

    if (floorPlan?.name) {
      this.updateRouter(floorPlan.name);
    }
  }

  private registerResizeListener() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200), startWith(0))
      .subscribe(() => {
        this.updateMargin();
      });
  }

  private initializeFloorPlanFromRoute() {
    if (this.floorPlanList.length === 0) return;

    const defaultFloor: string = this.route.snapshot.params['floorPlan'] ?? '';

    const floorPlan = this.floorPlanList.find(floorPlan => floorPlan.name === defaultFloor);

    if (floorPlan) {
      this.selectedFloorPlan.setValue(floorPlan);
    }
  }

  private fetchFloorPlanList() {
    this.floorPlanService
      .fetchFloorPlanList()
      .pipe(
        first(),
        map(floorPlan => normalizeFloorPlanData(floorPlan))
      )
      .subscribe((floorPlanList: FloorPlanServer[]) => {
        this.floorPlanList$.next(floorPlanList);
        this.initializeFloorPlanFromRoute();
      });
  }

  // Actions

  private updateMargin() {
    this.marginWidth = (this.floorPlanSwitcherElement?.nativeElement?.offsetWidth ?? 0) + this.GAP;
  }

  private updateRouter(floorPlan: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        floorPlan: floorPlan,
      },
      queryParamsHandling: 'merge',
    });
  }

  private registerSelectedFloorListener() {
    this.selectedFloorPlan.valueChanges
      .pipe(
        switchMap(selectedFloorPlan => {
          return this.floorPlanService.fetchZoneStatus(
            selectedFloorPlan?.id ?? environment.DEFAULT_BUILD_ID
          );
        })
      )
      .subscribe((floorPlanRawData: Zone[]) => {
        this.floorRawData.set(floorPlanRawData);
      });
  }

  private flushCurrentZoneList() {
    this.floorPlanService.fetchZoneStatus(this.currentFloorPlanId).subscribe(floorPlanRawData => {
      this.floorRawData.set(floorPlanRawData);
    });
  }

  // Actions: Zone on off
  private flushZoneOnOff(message?: RECEIVE_MESSAGE) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    const zoneData = JSON.parse(message.jsonString);

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              isOn: Number(message.value) === 1 ? 1 : 0,
              lightLevel: zoneData.lightLevel,
              lastUpdate: getCurrentDateString(),
            } as Zone)
          : zone;
      })
    );
  }

  // Actions: bypass
  updateBypassStatus(updatedZoneData: Zone) {
    this.websocketService.updateBypassStatus(updatedZoneData);

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(updatedZoneData.zoneId)
          ? ({
              ...zone,
              bypassAll: updatedZoneData.bypassAll,
              bypassAllAt: updatedZoneData.bypassAllAt,
              bypassOccupancySensor: updatedZoneData.bypassOccupancySensor,
              bypassOccupancySensorAt: updatedZoneData.bypassOccupancySensorAt,
              bypassDaylightSensor: updatedZoneData.bypassDaylightSensor,
              bypassDaylightSensorAt: updatedZoneData.bypassDaylightSensorAt,
            } as Zone)
          : zone;
      })
    );

    setTimeout(() => {
      this.flushCurrentZoneList();
    }, 1000);
  }

  private flushBypassStatus(message?: RECEIVE_MESSAGE) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              bypassAll: message.value ? 1 : 0,
              bypassOccupancySensor: message.value ? 1 : 0,
              bypassDaylightSensor: message.value ? 1 : 0,
            } as Zone)
          : zone;
      })
    );
  }

  private flushZoneBypassOccSensorStatus(message?: RECEIVE_MESSAGE) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              bypassOccupancySensor: Number(message.value),
              lastUpdate: getCurrentDateString(),
            } as Zone)
          : zone;
      })
    );
  }

  private flushZoneBypassDaylightSensorStatus(message?: RECEIVE_MESSAGE) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              bypassDaylightSensor: Number(message.value),
              lastUpdate: getCurrentDateString(),
            } as Zone)
          : zone;
      })
    );
  }

  // Actions: CCMS
  updateCCMSStatus(updateZoneData: Zone) {
    this.websocketService.updateCcmsStatus(updateZoneData);

    this.floorRawData.update(currentZoneList => {
      return currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(updateZoneData.zoneId)
          ? {
              ...updateZoneData,
            }
          : zone;
      });
    });
  }

  flushZoneCcmsControlStatus(message: RECEIVE_MESSAGE | undefined) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    const zoneData = JSON.parse(message.jsonString);

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              CcmsControlStatus: Number(message.value),
            } as Zone)
          : zone;
      })
    );
  }

  private flushLightLevelStatus(message: RECEIVE_MESSAGE | undefined) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    const zoneData = JSON.parse(message.jsonString);

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              isOn: zoneData.isOn,
              lightLevel: message.value,
              targetOnLevel: zoneData.targetOnLevel,
              lastUpdate: getCurrentDateString(),
            } as Zone)
          : zone;
      })
    );
  }

  // Actions: CLMS

  updateZoneOnOff(updateZoneData: Zone) {
    this.websocketService.updateZoneOnOff(updateZoneData);

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(updateZoneData.zoneId)
          ? {
              ...updateZoneData,
            }
          : zone;
      })
    );
  }

  // Actions: Occ

  updateOccSensorEnable(updateZoneData: Zone) {
    this.websocketService.updateZoneOccSensorEnable(updateZoneData);

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(updateZoneData.zoneId)
          ? {
              ...updateZoneData,
            }
          : zone;
      })
    );
  }

  private flushOccSensorEnableStatus(message: RECEIVE_MESSAGE | undefined) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    const zoneData = JSON.parse(message.jsonString);

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              OccSensorEnable: Number(message.value),
            } as Zone)
          : zone;
      })
    );
  }

  // Actions: Daylight

  updateDaylightSensorEnable(updateZoneData: Zone) {
    this.websocketService.updateZoneDaylightSensorEnable(updateZoneData);
  }

  flushDaylightSensorEnableStatus(message: RECEIVE_MESSAGE | undefined) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    const zoneData = JSON.parse(message.jsonString);

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              DaylightSensorEnable: Number(message.value),
            } as Zone)
          : zone;
      })
    );
  }

  // Actions: Occupied

  private flushZoneOccupiedStatusListensor(message?: RECEIVE_MESSAGE) {
    if (!message) return;

    if (Number(message.buildingId) !== Number(this.currentBuildingId)) return;

    this.floorRawData.update(currentZoneList =>
      currentZoneList.map(zone => {
        return Number(zone.zoneId) === Number(message.zoneId)
          ? ({
              ...zone,
              occupied: Number(message.value),
              lastUpdate: getCurrentDateString(),
            } as Zone)
          : zone;
      })
    );
  }

  // Getters

  get currentFloorPlanId() {
    return this.selectedFloorPlan.value?.id ?? environment.DEFAULT_BUILD_ID;
  }

  get currentBuildingId() {
    return this.selectedFloorPlan.value?.buildingId;
  }

  get floorPlanList() {
    return this.floorPlanList$.value;
  }
}
