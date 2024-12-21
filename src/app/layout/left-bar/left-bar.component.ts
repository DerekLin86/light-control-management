import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-left-bar',
  standalone:true,
  imports: [MatButtonModule,MatIconModule,MatDividerModule],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftBarComponent { }
