import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { error, Product } from '../../types';
import { v4 as uuidv4 } from 'uuid';

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
  @Output()
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
        return;
      }
    }

    this.sendProductsToParent.emit(newProd); // event fired

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
