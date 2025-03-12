import { FloorPlan as FloorPlanServer } from '../../types/floorPlan-service';
import { SERVICE_ADDRESS } from '../../constants/servers';

export function normalizeFloorPlanData(floorPlanList: FloorPlanServer[]) {
  return floorPlanList
    .map(floorPlan => {
      return {
        ...floorPlan,
        img: `${SERVICE_ADDRESS}/Photos/Floors/${floorPlan.img}`,
      };
    })
    .sort((pre, cur) => pre.sorting - cur.sorting);
}
