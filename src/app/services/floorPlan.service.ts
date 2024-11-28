import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

import {Building} from '../types/building'


@Injectable({
  providedIn: 'root'
})
export class FloorPlanService {
  private readonly client = inject(HttpClient);

  constructor() { }

  fetchBuildingList() {
    return this.client.get('http://103.247.167.186:5005/api/Building') as Observable<Building[]>
  }
}
