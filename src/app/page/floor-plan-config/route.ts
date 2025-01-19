import { Routes } from '@angular/router';

import {FloorPlanConfigComponent} from './floor-plan-config.component'

export const RoutePath = 'floorPlan';

export const FloorPlanRoutes: Routes = [
  {
    path: RoutePath,
    children: [
      {
        path: '',
        component: FloorPlanConfigComponent,
      },
    ],
  },
];
