import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-slider-toggle-formcontrol',
  imports: [FormsModule, MatSlideToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './slider-toggle-formcontrol.html',
  styleUrl: './slider-toggle-formcontrol.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderTootgleFormcontrolComponent),
      multi: true,
    },
  ],
})
export class SliderTootgleFormcontrolComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() toggleValue = false;
  @Output() toggleValueChange = new EventEmitter<boolean>();

  readonly status = new FormControl<boolean>(false);

  private destroy$ = new Subject<void>();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(value: any): void {
    this.status.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.status.disable();
    } else {
      this.status.enable();
    }
  }

  toggleChange(checked: boolean) {
    this.toggleValueChange.emit(checked);
  }
}
