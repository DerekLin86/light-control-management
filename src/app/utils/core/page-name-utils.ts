import { ROUTEPATH as FloorPlanRoutes } from '../../page/floor-plan-config/route';

export function convertRouterPathToPageName(routePath: string) {
  switch (routePath) {
    case FloorPlanRoutes: {
      return 'Control';
    }
    default:
      return '';
  }
}
