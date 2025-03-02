import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  OnChanges,
  EventEmitter,
  input,
  output,
  SimpleChanges,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';

import { FloorPlan } from '../../types/floorPlan';

import { MOCK_FLOOR_PLAN_LIST } from '../../constants/floorPlan';

@Component({
  selector: 'app-floor-plan-switcher',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './floor-plan-switcher.component.html',
  styleUrl: './floor-plan-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorPlanSwitcherComponent implements OnChanges, OnInit {
  readonly options = input<FloorPlan[]>(MOCK_FLOOR_PLAN_LIST);
  readonly floorPlanControl = input.required<FormControl<FloorPlan | null>>();
  readonly selectedOption = output<FloorPlan>();

  readonly selectedOption$ = new BehaviorSubject<FloorPlan | null>(null);

  @Output('onSelect')
  selectedOptionEmit = new EventEmitter<FloorPlan | null>();

  ngOnInit() {
    // For demo
    this.selectNewOption(MOCK_FLOOR_PLAN_LIST[0]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.selectNewOption(this.options()[0]);
    }
  }

  selectNewOption(option: FloorPlan) {
    this.selectedOption$.next(option);
    this.selectedOption.emit(option);
    this.selectedOptionEmit.emit(option);
  }
}
