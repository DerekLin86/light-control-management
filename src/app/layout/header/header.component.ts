import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ServerStatusComponent } from '../../components/server-status/server-status.component';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, CommonModule, MatIconModule, MatTooltipModule, ServerStatusComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  path = input<string>('');
}
