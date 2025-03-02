import { Injectable, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ROUTEPATH as FLOOR_PLAN_ROUTE_PATH } from '../page/floor-plan-config/route';

import { toPascalCase } from '../utils/core/string_utils';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  path = signal<string>('');

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateTitleFromRoute();
    });
  }

  private updateTitleFromRoute() {
    let path = '';
    let pageName = '';

    // Get the deepest active route
    let route = this.route.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // Get page name
    if (route.snapshot.data && route.snapshot.data['pageName']) {
      pageName = route.snapshot.data['pageName'];
    }

    switch (pageName) {
      case FLOOR_PLAN_ROUTE_PATH: {
        // Get project name and set it up.
        const queryParams = route.snapshot.params;
        if (queryParams['projectName']) {
          path = `${toPascalCase(queryParams['projectName'])}`;
        }

        path += ` > ${toPascalCase(pageName)}`;

        // Get project name and set it up.
        if (queryParams['floorPlan']) {
          path += ` > ${queryParams['floorPlan']}`.toUpperCase();
        }
      }
    }
    this.path.set(path);
  }
}
