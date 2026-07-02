// selector -> function
import { createSelector } from '@ngrx/store';

export const counterSelector = (state: { counter: number }) => state.counter;
export const doupleSelector = createSelector(counterSelector, (state) => state * 1000);
export const doupleMoreSelector = createSelector(
  counterSelector,
  doupleSelector,
  (state1, state2) => state1 * state2 * 1000,
);
