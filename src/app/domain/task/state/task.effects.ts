import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TaskApiService } from 'src/app/services';


@Injectable()
export class TaskEffects {
  private readonly taskService = inject(TaskApiService);
  private readonly actions$ = inject(Actions);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getTasks),
      exhaustMap(() =>
        this.taskService.getTasks().pipe(
          map((payload) => {
            return TaskActions.getTasksSuccess({payload})
          }),
          catchError((error) =>
            of(TaskActions.getTasksFailure({payload: {
              message: error?.error?.message || 'An unknown error occurred',
              status: error.status || 500,
            }
            }))
          )
        )
      )
    )
  );
}
