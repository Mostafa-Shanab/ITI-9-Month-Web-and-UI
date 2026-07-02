import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Counterservice {
  private initialCount = 0;

   counterSubject$ = new BehaviorSubject<number>(this.initialCount);
  // private counterSubject$ = new Subject<number>();
  counterObs$ = this.counterSubject$.asObservable();
  decrementCount() {
    this.counterSubject$.next(this.counterSubject$.value - 1);

    // this.counterSubject$.next(++this.initialCount);
  }
  incrementCount() {
    this.counterSubject$.next(this.counterSubject$.value + 1);
    // this.counterSubject$.next(++this.initialCount);
  }
  resetCount() {
    this.counterSubject$.next(this.initialCount);
  }
}
