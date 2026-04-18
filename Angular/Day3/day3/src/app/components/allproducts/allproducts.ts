import { Component, Input } from '@angular/core';
import { Card } from '../card/card';
import { Product } from '../../types';

@Component({
  selector: 'app-allproducts',
  imports: [Card],
  templateUrl: './allproducts.html',
  styles: ``,
})
export class Allproducts {
  @Input() data: Product[] = [];

  get dis() {
    console.log(this.data);
    return;
  }
}
