import { Action, createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment', props<{ count: number }>()); // two argus -> one is required (type) , decription (value)
export const decrement = createAction('[Counter] decrement', props<{ count: number }>());
export const reset = createAction('[Counter] reset');
export const start = createAction('[Counter] start');
export const set = createAction('[Counter] set', props<{ count: number }>());
// action functions

// export const INCREMENT = '[Counter] Increment';
// export class Increment implements Action {
//   readonly type: string = INCREMENT;
//   constructor(public payload: { count: number }) {}
// }
// export const DECREMENT = '[Counter] decrement';
// export class Decrement implements Action {
//   readonly type: string = DECREMENT;
//   constructor(public payload: { count: number }) {}
// }
// export const RESET = '[Counter] reset';
// export class Reset implements Action {
//   readonly type: string = RESET;
// }
