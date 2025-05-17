import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-daylight-status',
  imports: [],
  templateUrl: './daylight-status.component.html',
  styleUrl: './daylight-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaylightStatusComponent {
  readonly status = input.required<boolean>();

  readonly statusChange = output<boolean>();
}
