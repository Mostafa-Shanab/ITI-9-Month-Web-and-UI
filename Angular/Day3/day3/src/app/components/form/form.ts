import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { error, Product } from '../../types';

function generateShortId() {
  const id = uuidv4().split('-')[0];
  return id;
}

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styles: ``,
})
export class Form {
  @Input({
    alias: 'data',
    // required: true,
    // transform: (valueOfInput: number) => {
    //   return valueOfInput + 2;
    // },
  })
  parentData!: number;

  @Output()
  // sendProductsToParent = new EventEmitter<Product[]>();
  sendProductsToParent = new EventEmitter<Product>();

  prod: Product = {
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

  // prodArr: Product[] = [];

  error: error = {
    message: '',
    state: false,
  };
  setProduct() {
    this.error.state = false;
    let newProd: Product = { ...this.prod, id: generateShortId() };
    for (let p in newProd) {
      let key = p as keyof Product;
      if (newProd[key] === '' || newProd[key] === 0) {
        this.error.state = true;
        this.error.message = `please fill this field ${key}`;
        // console.log(this.error.message);
        return;
      }
    }

    // this.prodArr.push(newProd);
    // this.sendProductsToParent.emit(this.prodArr); // event fired
    this.sendProductsToParent.emit(newProd); // event fired
    // console.log('success');
    // console.log(this.prodArr);

    // this.prod = {
    //   id: '',
    //   name: '',
    //   category: '',
    //   description: '',
    //   price: 0,
    //   quantity: 0,
    //   imageUrl: '',
    //   isInCart: false,
    //   status: 'active',
    // };
  }
}
