import { Route } from '@angular/router';
import { TaskPageComponent } from './pages/task/task-page.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: TaskPageComponent
      }
];
