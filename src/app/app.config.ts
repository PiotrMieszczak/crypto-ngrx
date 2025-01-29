import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { taskReducer, TaskEffects } from './domain/task/state';
import { provideHttpClient } from '@angular/common/http';
import { TaskApiService } from './services';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { API_URL } from './injectables';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ tasks: taskReducer }),
    provideEffects([TaskEffects]),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    TaskApiService,
    { provide: API_URL, useValue: 'http://localhost:3000/tasks' },
  ],
};
