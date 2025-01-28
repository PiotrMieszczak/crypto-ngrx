import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaskDataService } from 'src/app/services';


@Injectable()
export class TaskEffects {
  private readonly taskService = inject(TaskDataService);
  private readonly actions$ = inject(Actions);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((payload) => {
            return TaskActions.getTasksSuccess({payload})
          }),
          catchError((error) =>
            of(TaskActions.getTasksFailure(error))
          )
        )
      )
    )
  );
}
