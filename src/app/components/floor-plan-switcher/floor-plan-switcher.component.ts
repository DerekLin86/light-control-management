import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  inject,
  OnChanges,
  EventEmitter,
  input,
  output,
  SimpleChanges,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';

import { FloorPlan as FloorPlanServer } from '../../types/floorPlan-service';
import { ImageDialogComponent } from '../dialog/image-dialog/image-dialog.component';

@Component({
  selector: 'app-floor-plan-switcher',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './floor-plan-switcher.component.html',
  styleUrl: './floor-plan-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorPlanSwitcherComponent implements OnChanges, OnInit {
  private readonly dialog = inject(MatDialog);

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

  // Actions:
  open(imageUrl: string | undefined) {
    this.dialog.open(ImageDialogComponent, {
      data: {
        imageUrl,
      },
      width: '80vw', // 80% of viewport width
      height: 'auto', // or specify like '600px'
      maxHeight: '90vh',
      maxWidth: '90vw',
      panelClass: 'floor-plan-image-dialog',
    });
  }
}
