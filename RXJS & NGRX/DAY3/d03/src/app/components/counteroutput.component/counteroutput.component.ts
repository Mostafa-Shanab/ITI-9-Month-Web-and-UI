import { Component, inject } from '@angular/core';
import { Counterservice } from '../../services/counterservice';
import { select, Store } from '@ngrx/store';
import { Observable, tap, withLatestFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counteroutput',
  imports: [AsyncPipe],
  templateUrl: './counteroutput.component.html',
  styles: ``,
})
export class CounteroutputComponent {
  store = inject(Store);
  counter$!: Observable<number>;
  counterService = inject(Counterservice);
  // counter = 0;

  ngOnInit() {
    // this.counterService.counterObs$.subscribe((v) => (this.counter = v));

    // this.counter$ = this.store.select("counter"); // observable
    this.counter$ = this.store.pipe(select('counter')); // observable

    // this.counterService.counterObs$.pipe(
    //   withLatestFrom(this.counterService.counterSubject$),
    //   tap(([action, value]) => {
    //     console.log(action, value);
    //   }),
    // ).subscribe((v) => console.log("ddddd :" v);)
  }
}
