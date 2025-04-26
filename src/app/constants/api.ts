export enum API_TYPE {
  'FETCH_FLOOR_PLAN',
  'FETCH_FLOOR_PHOTO',
  'FETCH_ZONE_DATA',
}

export const API_MAPPOING = new Map<API_TYPE, string>([
  [API_TYPE.FETCH_FLOOR_PLAN, 'api/Floor/InBuilding'],
  [API_TYPE.FETCH_FLOOR_PHOTO, 'Photos/Floors'],
  [API_TYPE.FETCH_ZONE_DATA, 'api/Status/LastZonesStatusWithMinLuxByFloor'],
]);
