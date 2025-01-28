import { createAction, props } from '@ngrx/store';
import { TaskDTO } from 'src/app/domain/dto';
import { ActionPayload } from 'src/app/domain/interfaces/action-payload.interface';
import { TaskFailurePayload } from 'src/app/domain/payloads';


export const GET_TASKS = '[Tasks] Get Tasks';
export const GET_TASKS_SUCCESS = '[Tasks] Get Tasks Success';
export const GET_TASKS_FAILURE = '[Tasks] Get Tasks Failure';

export const getTasks = createAction(GET_TASKS);

export const getTasksSuccess = createAction(
    GET_TASKS_SUCCESS,
  props<ActionPayload<TaskDTO[]>>()
);

export const getTasksFailure = createAction(
    GET_TASKS_FAILURE,
  props<ActionPayload<TaskFailurePayload>>()
);
