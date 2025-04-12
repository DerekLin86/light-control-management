import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-zone-status',
  imports: [],
  templateUrl: './zone-status-component.html',
  styleUrl: './zone-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.active]': 'active',
    '[class.inactive]': 'inactive',
  },
})
export class ZoneStatusComponent {
  readonly status = input.required<boolean>();

  get active() {
    return this.status();
  }

  get inactive() {
    return !this.status();
  }
}
