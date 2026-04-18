import { Component, EventEmitter, Output } from '@angular/core';
import { tabName } from '../../types';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styles: ``,
})
export class Tabs {
  @Output() sendTabName = new EventEmitter();
  name: tabName = 'all';

  setall() {
    this.name = 'all';
    this.sendTabName.emit(this.name);
  }
  setcart() {
    this.name = 'cart';
    this.sendTabName.emit(this.name);
  }
}
