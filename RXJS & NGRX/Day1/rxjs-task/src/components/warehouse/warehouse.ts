import { Component } from '@angular/core';
import { from, merge } from 'rxjs';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.html',
})
export class Warehouse {
  products: string[] = [];

  warehouse1$ = from(['Laptop', 'Mouse', 'Keyboard']);
  warehouse2$ = from(['Phone', 'Tablet', 'Watch']);
  warehouse3$ = from(['Camera', 'Printer', 'Monitor']);

  constructor() {
    const warehouses$ = merge(this.warehouse1$, this.warehouse2$, this.warehouse3$);

    warehouses$.subscribe({
      next: (product) => {
        this.products.push(product);
      },

      complete() {
        console.log('All warehouses completed');
      },
    });
  }
}
