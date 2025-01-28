import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskSelectors from './task.selectors';
import * as TaskActions from './task.actions';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  private readonly store = inject(Store);

  tasks$ = this.store.select(TaskSelectors.selectTasks);
  loading$ = this.store.select(TaskSelectors.selectLoading);
  error$ = this.store.select(TaskSelectors.selectError);
 
  loadTasks(): void {
    this.store.dispatch(TaskActions.getTasks());
  }
}
