import { mockTasks } from 'src/app/mocks/task.mock';
import * as TaskActions from '../task.actions';

describe('Task Actions', () => {
  it('should create getTasks action', () => {
    const action = TaskActions.getTasks();
    expect(action.type).toBe(TaskActions.GET_TASKS);
  });

  it('should create getTasksSuccess action with payload', () => {
    const action = TaskActions.getTasksSuccess({ payload: mockTasks });

    expect(action.type).toBe(TaskActions.GET_TASKS_SUCCESS);
    expect(action.payload).toEqual(mockTasks);
  });

  it('should create getTasksFailure action with error message', () => {
    const errorPayload = { message: 'http error', status: 500 };
    const action = TaskActions.getTasksFailure({ payload: errorPayload });

    expect(action.type).toBe(TaskActions.GET_TASKS_FAILURE);
    expect(action.payload).toEqual(errorPayload);
  });
});
