import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styles: ``,
})
export class Counter {
  @Input() counterFromParent = 0;
  // @Output() sendUpdatedCounterToParent = new EventEmitter<number>();
  @Output() counterFromParentChange = new EventEmitter<number>();
  // @Output() counterFromParentChange = new EventEmitter<number>();
  counter = 0;

  inc() {
    // ++this.counter;
    ++this.counterFromParent;
    // this.sendUpdatedCounterToParent.emit(++this.counterFromParent);
    this.counterFromParentChange.emit(++this.counterFromParent);
  }

  dec() {
    // --this.counter;
    --this.counterFromParent;
    // this.sendUpdatedCounterToParent.emit(--this.counterFromParent);
    this.counterFromParentChange.emit(--this.counterFromParent);
  }
}
