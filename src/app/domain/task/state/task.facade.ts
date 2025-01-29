import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskSelectors from './task.selectors';
import * as TaskActions from './task.actions';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  private readonly store = inject(Store);

  tasks$ = this.store.select<Task[]>(TaskSelectors.selectTasks);
  loading$ = this.store.select<boolean>(TaskSelectors.selectLoading);
  error$ = this.store.select<string>(TaskSelectors.selectError);

  getTasks(): void {
    this.store.dispatch(TaskActions.getTasks());
  }
}
