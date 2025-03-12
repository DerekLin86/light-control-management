import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

import {Building} from '../types/building'
import { FloorPlan as FloorPlanServerSide } from '../types/floorPlan-service';

import { SERVICE_ADDRESS } from '../constants/servers';
import { API_TYPE, API_MAPPOING } from '../constants/api';

@Injectable({
  providedIn: 'root',
})
export class FloorPlanService {
  private readonly client = inject(HttpClient);

  constructor() {}

  fetchFloorPlanList(buildId: string = '4') {
    return this.client.get(
      `${SERVICE_ADDRESS}/${API_MAPPOING.get(API_TYPE.FETCH_FLOOR_PLAN)}/${buildId}`
    ) as Observable<FloorPlanServerSide[]>;
  }

  fetchFloorPhoto(imgName: string) {

  }
}
