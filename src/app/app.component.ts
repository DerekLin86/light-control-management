import { Component, signal, OnInit, inject } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { of, filter, map } from 'rxjs';
import { Router } from '@angular/router';

import { LeftBarComponent } from './layout/left-bar/left-bar.component';
import { HeaderComponent } from './layout/header/header.component';

import {HeaderService} from './services/header.service';

import { convertRouterPathToPageName } from './utils/core/page-name-utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeftBarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly headerService = inject(HeaderService);

  readonly title = 'LS-management';
  private _projectName = signal('');
  private _pageName = signal('');

  ngOnInit() {
    this.fetchProjectName();

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(route => route.urlAfterRedirects.split('/')[1])
      )
      .subscribe(routePath => {
        this._pageName.set(convertRouterPathToPageName(routePath));
      });
  }

  fetchProjectName() {
    of('Crestron').subscribe(projectName => {
      this._projectName.set(projectName);
    });
  }

  // Getters
  get routerPath() {
    return this.headerService.path.asReadonly();
  }
}
