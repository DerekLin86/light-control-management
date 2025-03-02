import { Routes } from '@angular/router';

import {FloorPlanConfigComponent} from './floor-plan-config.component'

export const ROUTEPATH = 'control';

export const FloorPlanRoutes: Routes = [
  {
    path: ROUTEPATH,
    children: [
      {
        path: ':projectName',
        component: FloorPlanConfigComponent,
        data: {
          pageName: ROUTEPATH,
        },
      },
    ],
  },
];
