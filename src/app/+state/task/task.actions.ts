import { createAction, props } from '@ngrx/store';
import { TaskFailurePayload, TaskPayload } from 'src/app/domain/payloads';


export const GET_TASKS = '[Tasks] Get Tasks';
export const GET_TASKS_SUCCESS = '[Tasks] Get Tasks Success';
export const GET_TASKS_FAILURE = '[Tasks] Get Tasks Failure';

export const getTasks = createAction(GET_TASKS);

export const getTasksSuccess = createAction(
    GET_TASKS_SUCCESS,
  props<TaskPayload>()
);

export const getTasksFailure = createAction(
    GET_TASKS_FAILURE,
  props<TaskFailurePayload>()
);
