import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { Data, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DataService } from './data.service';
import { firstValueFrom } from 'rxjs';

export function initializeApp(data: DataService) {
  return (): Promise<any> =>data.load()
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [DataService],
    }
  ]
};
