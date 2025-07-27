import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FloorPlanData } from '../types/floorPlan';
import { FloorPlan as FloorPlanServerSide } from '../types/floorPlan-service';
import { AppConfigService } from './appConfig.service';

import { API_TYPE, API_MAPPOING } from '../constants/api';
import { MOCK_LIGHT_DATA } from '../constants/floorPlan';
import { Zone, ServerZone } from '../types/zone';

@Injectable({
  providedIn: 'root',
})
export class FloorPlanService {
  private readonly client = inject(HttpClient);
  private readonly appConfigService = inject(AppConfigService);

  constructor() {}

  fetchFloorPlanList(buildId: string = '4') {
    return this.client.get(
      `${this.appConfigService.serviceAddress}/${API_MAPPOING.get(API_TYPE.FETCH_FLOOR_PLAN)}/${buildId}`
    ) as Observable<FloorPlanServerSide[]>;
  }

  fetchFloorConfiguration(floorId: number): Observable<FloorPlanData[]> {
    return of(MOCK_LIGHT_DATA);
  }

  fetchZoneStatus(floorId: number) {
    return (
      this.client.get(
        `${this.appConfigService.serviceAddress}/${API_MAPPOING.get(API_TYPE.FETCH_ZONE_DATA)}/${floorId}`
      ) as Observable<ServerZone[]>
    ).pipe(
      map((zoneData: ServerZone[]) => {
        return zoneData.map(zoneServer => {
          return {
            ...zoneServer,
            zoneType: JSON.parse(zoneServer.zoneType),
          };
        }) as Zone[];
      })
    );
  }
}
