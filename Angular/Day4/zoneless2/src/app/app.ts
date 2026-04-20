import { Component } from '@angular/core';
import { Counter } from './components/counter/counter';
import { Product } from './types';
import { Form } from './components/form/form';
import { Productlists } from './components/productlists/productlists';
import { One } from './components/hooks/one/one';
import { Two } from './components/hooks/two/two';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Counter, Form, Productlists, One, Two],
})
export class App {
  count: number = 0;
  obj = {
    name: 'ali',
  };

  changObj() {
    // this.obj.name = 'hossam'; // send same ref (there is no change)
    this.obj = { ...this.obj, name: 'hossam' }; // send same ref (there is no change)
  }

  // getCountFromChild(n: number) {
  //   this.count = n;
  // }

  // prodArr: Product[] = [];
  prodObjInParent: Product = {
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

  getData(prod: Product) {
    // this.prodArr.push(prod);
    // this.prodArr = [...this.prodArr, prod];
    this.prodObjInParent = { ...prod };
    // console.log(this.prodObjInParent);
  }

  get dis() {
    console.log('%capp comp', 'color : yellow');
    return '';
  }
}
