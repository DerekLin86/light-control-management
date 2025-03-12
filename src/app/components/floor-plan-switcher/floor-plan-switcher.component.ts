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

import { FloorPlan as FloorPlanServer } from '../../types/floorPlan-service';
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
  readonly options = input<FloorPlanServer[]>([]);
  readonly floorPlanControl = input.required<FormControl<FloorPlanServer | null>>();
  readonly selectedOption = output<FloorPlanServer>();

  readonly selectedOption$ = new BehaviorSubject<FloorPlanServer | null>(null);

  @Output('onSelect')
  selectedOptionEmit = new EventEmitter<FloorPlanServer | null>();

  ngOnInit() {
    // For demo
    // this.selectNewOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      if (this.options().length > 0) {
        this.selectNewOption(this.options()[0]);
      }
    }
  }

  selectNewOption(option: FloorPlanServer) {
    this.selectedOption$.next(option);
    this.selectedOption.emit(option);
    this.selectedOptionEmit.emit(option);
  }
}
