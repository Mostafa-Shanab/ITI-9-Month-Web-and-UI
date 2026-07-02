import { Component, inject } from '@angular/core';
import { CountercontrolerComponent } from './components/countercontroler.component/countercontroler.component';
import { CounteroutputComponent } from './components/counteroutput.component/counteroutput.component';
import { Store } from '@ngrx/store';
import { start } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CountercontrolerComponent, CounteroutputComponent],
})
export class App {
  store = inject(Store);
  outputComp = true;
  controlerComp = true;
  hideControler() {
    this.controlerComp = !this.controlerComp;
  }
  hideOutput() {
    this.outputComp = !this.outputComp;
  }

  ngOnInit() {
    this.store.dispatch(start());
  }
}

// npm i @ngrx/store
// ng add @ngrx/store

// (1) Create -> Store -> provide Store for app
// (2) add data to store -> initialState -> need reducer
// (3) create reducer -> (1) new
// (3)                -> (2) old
