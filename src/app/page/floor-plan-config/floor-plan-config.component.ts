import { Component, OnInit, inject } from '@angular/core';

import {FloorPlanService} from '../../services/floorPlan.service';
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
export class FloorPlanConfigComponent implements OnInit {
  private readonly floorPlanService = inject(FloorPlanService);

  currentFloorPlan = '';

  ngOnInit(): void {
    this.fetchBuildingList();
  }

  selectFloorPlan(floorPlan: FloorPlan | null) {
    this.currentFloorPlan = floorPlan?.label ?? '';
  }

  private fetchBuildingList() {
    this.floorPlanService.fetchBuildingList().subscribe((buildingList: Building[]) => {
      // this.floorPlanList = buildingList.map((building) => {
      //   return {text: building.name, selected: true};
      // })
    });
  }
}
