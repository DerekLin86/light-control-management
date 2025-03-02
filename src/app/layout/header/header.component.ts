import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  path = input<string>('');
}
