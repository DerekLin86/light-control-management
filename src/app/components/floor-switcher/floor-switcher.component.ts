import { ChangeDetectionStrategy, Component, type OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

export interface FloorPlan {
  text: string;
  selected?: boolean;
}

@Component({
  selector: 'app-floor-switcher',
  imports: [MatButtonModule],
  templateUrl: './floor-switcher.component.html',
  styleUrl: './floor-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorSwitcherComponent implements OnInit {

  @Input()
  floorPlanList: FloorPlan[] = [];

  @Output()
  switchedFloor = new EventEmitter<FloorPlan>;

  ngOnInit(): void { }

  selectFloorPlan(index: number) {
    this.resetFloorPlanButtons();

    this.floorPlanList[index].selected = true;
    this.switchedFloor.emit(this.floorPlanList[index]);
  }

  private resetFloorPlanButtons() {
    this.floorPlanList = this.floorPlanList.map((floorPlan) => {
      return {
        ...floorPlan,
        selected: false
      };
    })
  }
}
