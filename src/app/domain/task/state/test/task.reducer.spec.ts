import { taskReducer, initialState } from '../task.reducer';
import * as TaskActions from '../task.actions';
import { mockTasks } from 'src/app/mocks/task.mock';

describe('Task Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = taskReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should set loading to true when fetching tasks', () => {
    const action = TaskActions.getTasks();
    const state = taskReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should update state with retrieved tasks and set loading to false', () => {
    const action = TaskActions.getTasksSuccess({ payload: mockTasks });
    const state = taskReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.tasks).toEqual(mockTasks);
  });

  it('should set an error message and stop loading when task fetching fails', () => {
    const errorPayload = { message: 'http error', status: 500 };
    const action = TaskActions.getTasksFailure({ payload: errorPayload });
    const state = taskReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(`Error 500: http error`);
  });
});
