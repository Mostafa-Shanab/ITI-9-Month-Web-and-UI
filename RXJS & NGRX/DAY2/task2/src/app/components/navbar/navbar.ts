import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  imports: [DecimalPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  cartService = inject(CartService);
  cartCount = 0;
  cartTotal = 0;
  activeOperator = '';

  ngOnInit() {
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
      this.cartTotal = this.cartService.getCartTotal();
    });

    this.cartService.operator$.subscribe((op) => {
      this.activeOperator = op;
    });
  }
}
