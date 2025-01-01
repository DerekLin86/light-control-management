import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  DestroyRef,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';

import { FloorPlan } from '../../types/floorPlan';

import { MOCK_FLOOR_PLAN_LIST } from '../../constants/floorPlan';

@Component({
  selector: 'app-floor-plan-switcher',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './floor-plan-switcher.component.html',
  styleUrl: './floor-plan-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorPlanSwitcherComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  filteredOptions$ = new BehaviorSubject<FloorPlan[]>([]);
  selectedOption$ = new BehaviorSubject<FloorPlan | null>(null);

  readonly selectedFloorPlan = new FormControl<string>('');
  readonly optionsSubject$ = new BehaviorSubject<FloorPlan[]>([]);

  private readonly floorPlanOptions: FloorPlan[] = [];

  @Output()
  selectedOptionEmit = new EventEmitter<FloorPlan | null>();

  ngOnInit() {
    this.fetchFloorPlan();
    this.triggerFilterOptions();
  }

  selectOption(selectedtext: string) {
    const selectedOption = this.floorPlanOptions.find(option => option.label === selectedtext);

    this.selectNewOption(selectedOption ?? null);
  }

  private fetchFloorPlan() {
    of(MOCK_FLOOR_PLAN_LIST).subscribe(value => {
      this.floorPlanOptions.push(...value);
    });
  }

  private triggerFilterOptions() {
    this.selectedFloorPlan.valueChanges
      .pipe(
        map(val => {
          return val ?? '';
        }),
        takeUntilDestroyed(this.destroyRef),
        startWith(''),
        map((typeText: string) => {
          if (!typeText) return this.floorPlanOptions;

          return this.floorPlanOptions.filter(option => {
            const text = typeText.toLowerCase();
            return option.label ? option.label.includes(text) : null;
          });
        })
      )
      .subscribe((filteredOptions: FloorPlan[]) => {
        if (filteredOptions.length === this.floorPlanOptions.length) {
          this.selectNewOption(null);
        }
        this.filteredOptions$.next(filteredOptions);
      });
  }

  private selectNewOption(option: FloorPlan | null) {
    this.selectedOption$.next(option);
    this.selectedOptionEmit.emit(option);
  }
}
