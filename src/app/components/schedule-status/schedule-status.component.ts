import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ScheduleStatusComponent,',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './schedule-status.component.html',
  styleUrl: './schedule-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleStatusComponent {
  readonly status = input.required<boolean>();
}
