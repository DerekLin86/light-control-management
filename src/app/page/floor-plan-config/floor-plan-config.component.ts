import { Component, OnInit, inject } from '@angular/core';

import {FloorPlanService} from '../../services/floorPlan.service';

import {Building} from '../../types/building'


@Component({
  selector: 'app-floor-plan-config',
  imports: [],
  templateUrl: './floor-plan-config.component.html',
  styleUrl: './floor-plan-config.component.scss'
})
export class FloorPlanConfigComponent implements OnInit{
 private readonly floorPlanService = inject(FloorPlanService);

  ngOnInit(): void {
    this.fetchBuildingList();
  }

  private fetchBuildingList() {
    this.floorPlanService.fetchBuildingList().subscribe((buildingList: Building[]) => {
      console.log(buildingList);
    });
  }
}
