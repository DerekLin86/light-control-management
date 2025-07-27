import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

export interface Config {
  SERVICE_ADDRESS: string;
  WEBSOCKET_ADDRESS: string;
  DEFAULT_BUILD_ID?: number;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config = signal<Config | undefined>(undefined);

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get('/assets/services.json').pipe(
      tap((config: any) => {
        this.config.set(config as Config);

        console.log(this.config());
      })
    );
  }

  get serviceAddress() {
    return this.config()?.SERVICE_ADDRESS ?? '';
  }

  get webSocketAddress() {
    return this.config()?.WEBSOCKET_ADDRESS ?? '';
  }

  get defaultBuildId() {
    return this.config()?.DEFAULT_BUILD_ID;
  }
}
