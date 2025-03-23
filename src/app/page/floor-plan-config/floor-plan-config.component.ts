import {
  AfterViewInit,
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  signal,
} from '@angular/core';
import { BehaviorSubject, fromEvent, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, startWith, first, map, single, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { FloorPlanService } from '../../services/floorPlan.service';
import { GroupedTableComponent } from '../../components/grouped-table/grouped-table.component';
import { FloorPlanSwitcherComponent } from '../../components/floor-plan-switcher/floor-plan-switcher.component';

import { FloorPlanData } from '../../types/floorPlan';
import { FloorPlan as FloorPlanServer } from '../../types/floorPlan-service';

import { normalizeFloorPlanData } from '../../utils/floor-plan/floor-plan-utils';

@Component({
  selector: 'app-floor-plan-config',
  imports: [FloorPlanSwitcherComponent, GroupedTableComponent],
  templateUrl: './floor-plan-config.component.html',
  styleUrl: './floor-plan-config.component.scss',
})
export class FloorPlanConfigComponent implements AfterViewInit, OnInit {
  private readonly floorPlanService = inject(FloorPlanService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly selectedFloorPlan = new FormControl<FloorPlanServer | null>(null);

  protected readonly floorPlanList$ = new BehaviorSubject<FloorPlanServer[]>([]);
  protected readonly floorRawData = signal<FloorPlanData[]>([]);

  readonly GAP = 32; //px
  marginWidth = 0;
  currentFloorPlan = '';

  @ViewChild(FloorPlanSwitcherComponent, { read: ElementRef })
  floorPlanSwitcherElement!: ElementRef;

  ngOnInit(): void {
    this.registerSelectedFloorListener();
    this.fetchFloorPlanList();
    this.registerResizeListener();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateMargin();
    }, 500);
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
          return selectedFloorPlan
            ? this.floorPlanService.fetchFloorConfiguration(selectedFloorPlan.id).pipe(first())
            : of([]);
        })
      )
      .subscribe((floorPlanRawData: FloorPlanData[]) => {
        this.floorRawData.set(floorPlanRawData);
      });
  }

  // Getters

  get floorPlanList() {
    return this.floorPlanList$.value;
  }
}
