import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {LeftBarComponent} from './layout/left-bar/left-bar.component';
import {HeaderComponent} from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeftBarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LS-management';
}
