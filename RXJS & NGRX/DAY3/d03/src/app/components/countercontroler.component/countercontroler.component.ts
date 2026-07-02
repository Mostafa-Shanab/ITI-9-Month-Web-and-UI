import { Component, inject } from '@angular/core';
import { Counterservice } from '../../services/counterservice';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
// import { Decrement, Increment, Reset } from '../../store/actions';
import { decrement, increment, reset } from '../../store/actions';
import { counterSelector, doupleMoreSelector, doupleSelector } from '../../store/selectors';

@Component({
  selector: 'app-countercontroler',
  imports: [AsyncPipe],
  templateUrl: './countercontroler.component.html',
  styles: ``,
})
export class CountercontrolerComponent {
  store = inject(Store<{ counter: number }>);
  counter$!: Observable<number>;
  douple$!: Observable<number>;
  more$!: Observable<number>;
  counterService = inject(Counterservice);
  // counter = 0;
  decrement() {
    // this.counterService.decrementCount();
    this.store.dispatch(decrement({ count: 100 }));
    // this.store.dispatch(new Decrement({ count: 100 }));
  }
  increment() {
    this.counterService.incrementCount();
    this.store.dispatch(increment({ count: 200 }));
    // this.store.dispatch(new Increment({ count: 300 }));
  }
  reset() {
    // this.counterService.resetCount();
    this.store.dispatch(reset());
    // this.store.dispatch(new Reset());
  }
  ngOnInit() {
    // this.counterService.counterObs$.subscribe((v) => (this.counter = v));

    // this.counter$ = this.store.select('counter');
    this.counter$ = this.store.select(counterSelector);
    this.douple$ = this.store.select(doupleSelector);
    this.more$ = this.store.select(doupleMoreSelector);
  }
}
