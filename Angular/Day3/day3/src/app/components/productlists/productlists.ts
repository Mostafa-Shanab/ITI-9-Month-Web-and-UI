import { Component, Input } from '@angular/core';
import { Tabs } from '../tabs/tabs';
import { Allproducts } from '../allproducts/allproducts';
import { Cart } from '../cart/cart';
import { Product, tabName } from '../../types';

@Component({
  selector: 'app-productlists',
  imports: [Tabs, Allproducts, Cart],
  templateUrl: './productlists.html',
  styles: ``,
})
export class Productlists {
  @Input() dataInlist: Product[] = [];
  name: tabName = 'all';
  get dis() {
    console.log(this.dataInlist);
    return;
  }
  getTabName(n: tabName) {
    this.name = n;
  }
}
