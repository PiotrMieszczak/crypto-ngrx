import { Route } from '@angular/router';
import { TaskPageComponent } from './pages/task/task-page.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects, taskReducer } from './domain/task/state';

export const appRoutes: Route[] = [
    {
      path: '',
      component: TaskPageComponent,
      providers: [
        provideState({ name: 'tasks', reducer: taskReducer }),
        provideEffects([TaskEffects])
      ]
    }
];
