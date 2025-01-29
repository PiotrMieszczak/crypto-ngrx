import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskSelectors from './task.selectors';
import * as TaskActions from './task.actions';
import { Task } from '../models/task.model';
import { TaskState } from './task.reducer';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  private readonly store = inject<Store<TaskState>>(Store);

  tasks = this.store.selectSignal<Task[]>(TaskSelectors.selectTasks);
  loading = this.store.selectSignal<boolean>(TaskSelectors.selectLoading);
  error = this.store.selectSignal<string>(TaskSelectors.selectError);

  getTasks(): void {
    this.store.dispatch(TaskActions.getTasks());
  }
}
