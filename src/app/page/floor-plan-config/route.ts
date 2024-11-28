import { Routes } from '@angular/router';

import {FloorPlanConfigComponent} from './floor-plan-config.component'

export const FloorPlanRoutes: Routes = [{
  path: 'floorPlan',
  children: [{
    path: '',
    component: FloorPlanConfigComponent
  }]
}]
