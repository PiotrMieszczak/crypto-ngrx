import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TaskEffects } from '../task.effects';
import { TaskApiService } from 'src/app/services';
import * as TaskActions from '../task.actions';
import { hot, cold } from 'jest-marbles';
import { Action } from '@ngrx/store';
import { mockTasks } from 'src/app/mocks/task.mock';

describe('Task Effects', () => {
  let actions$: Observable<Action>;
  let effects: TaskEffects;
  let taskService: jest.Mocked<TaskApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskEffects,
        provideMockActions(() => actions$),
        {
          provide: TaskApiService,
          useValue: {
            getTasks: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(TaskEffects);
    taskService = TestBed.inject(TaskApiService) as jest.Mocked<TaskApiService>;
  });

  describe('loadTasks$', () => {
    it('should dispatch getTasksSuccess action on successful API call', () => {
      const action = TaskActions.getTasks();
      const result = TaskActions.getTasksSuccess({ payload: mockTasks });

      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: mockTasks });
      taskService.getTasks.mockReturnValue(response);

      const expected = cold('--c', { c: result });

      expect(effects.loadTasks$).toBeObservable(expected);
    });

    it('should dispatch getTasksFailure action on API error', () => {
      const mockHttpError = {
        error: { message: 'Error occurred' },
        status: 500,
      };
      const action = TaskActions.getTasks();
      const result = TaskActions.getTasksFailure({
        payload: {
          message: mockHttpError.error.message,
          status: mockHttpError.status,
        },
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, mockHttpError);
      taskService.getTasks.mockReturnValue(response);

      const expected = cold('--c', { c: result });
      expect(effects.loadTasks$).toBeObservable(expected);
    });

    it('should handle unknown error and dispatch getTasksFailure with default values', () => {
      const mockUnknownError = {
        error: 'Error occurred',
        status: 500,
      };
      const action = TaskActions.getTasks();
      const result = TaskActions.getTasksFailure({
        payload: {
          message: mockUnknownError.error,
          status: mockUnknownError.status,
        },
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, mockUnknownError);
      taskService.getTasks.mockReturnValue(response);

      const expected = cold('--c', {
        c: {
          ...result,
          payload: { status: 500, message: 'An unknown error occurred' },
        },
      });
      expect(effects.loadTasks$).toBeObservable(expected);
    });
  });
});
