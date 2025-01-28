import { Route } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: TaskListComponent
      }
];
