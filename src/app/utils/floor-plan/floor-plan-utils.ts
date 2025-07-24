import { FloorPlan as FloorPlanServer } from '../../types/floorPlan-service';
import { environment } from '../../../environments/environment';

export function normalizeFloorPlanData(floorPlanList: FloorPlanServer[]) {
  return floorPlanList
    .map(floorPlan => {
      return {
        ...floorPlan,
        img: `${environment.SERVICE_ADDRESS}/Photos/Floors/${floorPlan.img}`,
      };
    })
    .sort((pre, cur) => pre.sorting - cur.sorting);
}
