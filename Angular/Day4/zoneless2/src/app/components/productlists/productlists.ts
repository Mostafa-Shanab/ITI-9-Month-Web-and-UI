import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../types';
import { Card } from '../card/card';

@Component({
  selector: 'app-productlists',
  imports: [Card],
  templateUrl: './productlists.html',
  styles: ``,
})
export class Productlists {
  // @Input() dataInlist: Product[] = [];
  @Input() dataObjInList: Product = {
    id: '',
    name: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
    imageUrl: '',
    isInCart: false,
    status: 'active',
  };

  @Input() dataJiiii!: number;

  dataInlist: Product[] = [];

  // where will push obj in array
  // dataInlist.push() ❌❌❌❌❌

  // pushToArray() {
  //   this.dataInlist.push(this.dataObjInList);
  //   console.log(this.dataInlist);
  //   return this.dataInlist;
  // } ❌❌❌❌❌

  // constructor() {
  //     this.dataInlist.push(this.dataObjInList);
  // }    ❌❌❌❌❌

  // initial change detection (input exist in comp)
  // will keep running when input changes
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.dataObjInList);
    console.log(changes);
    if (changes['dataObjInList'].firstChange) return;
    this.dataInlist.push(this.dataObjInList);
    // console.log(this.dataInlist);
    // console.log('productList');
  }
}
