import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-left-bar',
  standalone:true,
  imports: [],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftBarComponent { }
