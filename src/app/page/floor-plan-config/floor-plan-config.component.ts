import { AfterViewInit, Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

import { FloorPlanService } from '../../services/floorPlan.service';
import { GroupedTableComponent } from '../../components/grouped-table/grouped-table.component';
import { FloorPlanSwitcherComponent } from '../../components/floor-plan-switcher/floor-plan-switcher.component';

import { Building } from '../../types/building';
import { FloorPlan } from '../../types/floorPlan';

@Component({
  selector: 'app-floor-plan-config',
  imports: [FloorPlanSwitcherComponent, GroupedTableComponent],
  templateUrl: './floor-plan-config.component.html',
  styleUrl: './floor-plan-config.component.scss',
})
export class FloorPlanConfigComponent implements AfterViewInit, OnInit {
  private readonly floorPlanService = inject(FloorPlanService);

  private resizeObserver: ResizeObserver | undefined;

  readonly GAP = 88; //px
  marginWidth = 0;
  currentFloorPlan = '';

  @ViewChild(FloorPlanSwitcherComponent, { read: ElementRef })
  floorPlanSwitcherElement!: ElementRef;

  ngOnInit(): void {
    this.fetchBuildingList();
    this.registerResizeListener();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateMargin();
    }, 500);
  }

  selectFloorPlan(floorPlan: FloorPlan | null) {
    this.currentFloorPlan = floorPlan?.label ?? '';
    this.updateMargin();
  }

  private registerResizeListener() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200), startWith(0))
      .subscribe(() => {
        this.updateMargin();
      });
  }

  private fetchBuildingList() {
    this.floorPlanService.fetchBuildingList().subscribe((buildingList: Building[]) => {
      // this.floorPlanList = buildingList.map((building) => {
      //   return {text: building.name, selected: true};
      // })
    });
  }

  private updateMargin() {
    this.marginWidth = (this.floorPlanSwitcherElement?.nativeElement?.offsetWidth ?? 0) + this.GAP;
  }
}
