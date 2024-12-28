import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-light-status',
  imports: [MatIconModule],
  standalone: true,
  templateUrl: './light-status.component.html',
  styleUrl: './light-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.light-on]': 'status',
  },
})
export class LightStatusComponent {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);

  @Input({ required: true }) lightStatus!: boolean;
  @Output() lightStatusChange = new EventEmitter<boolean>();

  constructor() {
    this.iconRegistry.addSvgIcon(
      'ls-light-off',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/lightoff.svg')
    );
  }
}
