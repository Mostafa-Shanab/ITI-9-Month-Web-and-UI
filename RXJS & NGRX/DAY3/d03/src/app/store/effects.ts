import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, reset, set, start } from './actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { counterSelector } from './selectors';

export class CounterEffect {
  actions$ = inject(Actions);
  store = inject(Store);
  setCounter = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(counterSelector)), // [action , latest value store]
        tap({
          next: ([action, value]) => {
            // console.log(action);
            // console.log(value);
            localStorage.setItem('counter', value.toString());
          },
        }),
      ),
    {
      dispatch: false,
    },
  ); // pipeline

  getCounter = createEffect(
    () =>
      this.actions$.pipe(
        ofType(start),
        switchMap(() => {  // return obs
          const storedCounter = localStorage.getItem('counter');
          if (storedCounter) {
            return of(set({ count: +storedCounter }));
          }
          return of(set({ count: 0 }));
        }),
        tap((v) => console.log(v)),
      ),
    {
      dispatch: true,
    },
  );
}
