import { Action, createReducer, on } from '@ngrx/store';
// import { Decrement, DECREMENT, Increment, INCREMENT, Reset } from './actions';
import { decrement, increment, reset, set } from './actions';

const initialState = 0;
export const counterReducer = createReducer(
  initialState,

  on(increment, (state, action) => {
    // console.log(action);
    return state + action.count;
  }), // two arguments   (action , cb)
  on(decrement, (state, action) => {
    return state - action.count;
  }),
  on(reset, () => {
    return initialState;
  }),
  on(set, (state, action) => {
    return (state = action.count);
  }),
); // is not useful yet
// we need to add reducer to sote
// create actions
// use action (liesten action)

// export function counterReducer(state = initialState, action: Increment | Decrement | Reset | Action) {
//   console.log(action);
//   switch (action.type) {
//     case INCREMENT:
//       return state + (action as Increment).payload.count;
//     case DECREMENT:
//       return state - (action as Decrement).payload.count;
//     default:
//       return 0;
//   }
// }
