import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
  input,
  output
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';

import { FloorPlan } from '../../types/floorPlan';

import { MOCK_FLOOR_PLAN_LIST } from '../../constants/floorPlan';

@Component({
  selector: 'app-floor-plan-switcher',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './floor-plan-switcher.component.html',
  styleUrl: './floor-plan-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorPlanSwitcherComponent implements OnInit {
  readonly options = input<FloorPlan[]>(MOCK_FLOOR_PLAN_LIST);
  readonly selectedOption = output<FloorPlan>();

  readonly selectedOption$ = new BehaviorSubject<FloorPlan | null>(null);

  @Output()
  selectedOptionEmit = new EventEmitter<FloorPlan | null>();

  ngOnInit() {}

  selectNewOption(option: FloorPlan) {
    this.selectedOption$.next(option);
    this.selectedOption.emit(option);
  }
}
