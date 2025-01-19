import { RoutePath as FloorPlanRoutes } from '../../page/floor-plan-config/route';

export function convertRouterPathToPageName(routePath: string) {
  switch (routePath) {
    case FloorPlanRoutes: {
      return 'Lighting Control';
    }
    default:
      return '';
  }
}
