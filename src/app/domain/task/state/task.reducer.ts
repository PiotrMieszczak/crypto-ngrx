import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { Task } from 'src/app/domain/task/models';
import { TaskAdapter } from 'src/app/domain/task/adapters/task.adapter';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.getTasks, state => ({ ...state, loading: true })),
  on(TaskActions.getTasksSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    tasks: payload.map(dto => TaskAdapter.createTask(dto))
  })),
  on(TaskActions.getTasksFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload.error,
  }))
);