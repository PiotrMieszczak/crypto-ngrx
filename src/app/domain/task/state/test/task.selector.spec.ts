import { selectTasks, selectLoading, selectError } from '../task.selectors';
import { TaskState } from '../task.reducer';
import { mockTasks } from 'src/app/mocks/task.mock';

describe('Task Selectors', () => {
  const state: TaskState = {
    tasks: mockTasks,
    loading: true,
    error: 'error',
  };

  it('should select tasks', () => {
    expect(selectTasks.projector(state)).toEqual(mockTasks);
  });

  it('should select loading', () => {
    expect(selectLoading.projector(state)).toBe(true);
  });

  it('should select error', () => {
    expect(selectError.projector(state)).toBe('error');
  });
});
