import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './services/appConfig.service';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function loadingConfig(): Observable<unknown> {
  const appConfigService = inject(AppConfigService);
  return appConfigService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync('noop'),
    AppConfigService,
    provideAppInitializer(loadingConfig),
  ],
};
