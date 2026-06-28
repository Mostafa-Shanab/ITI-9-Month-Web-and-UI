import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Toast } from './components/toast/toast';
import { CartService } from './services/cart';
import { Product, CartItem, LogEntry } from './types/product';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Navbar, Toast, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  cartService = inject(CartService);

  // Component state variables (synchronized with the service streams)
  products: Product[] = [];
  cart: CartItem[] = [];
  loading = false;
  error: string | null = null;
  activeOperator: 'concatMap' | 'mergeMap' | 'switchMap' | 'exhaustMap' = 'concatMap';
  logs: LogEntry[] = [];

  ngOnInit() {
    // Subscribe to products list
    this.cartService.products$.subscribe((prods) => {
      this.products = prods;
    });

    // Subscribe to cart contents
    this.cartService.cart$.subscribe((cartItems) => {
      this.cart = cartItems;
    });

    // Subscribe to loading state
    this.cartService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });

    // Subscribe to error messages
    this.cartService.error$.subscribe((errMsg) => {
      this.error = errMsg;
    });

    // Subscribe to currently active flattening operator
    this.cartService.operator$.subscribe((op) => {
      this.activeOperator = op;
    });

    // Subscribe to logs stream
    this.cartService.logs$.subscribe((logList) => {
      this.logs = logList;
    });

    // Load initial products from API
    this.cartService.refreshProducts();
  }

  // Handle live search
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.cartService.search$.next(inputElement.value);
  }

  // Trigger Add to Cart pipeline (goes through RxJS flattening operators)
  onAddToCart(product: Product) {
    this.cartService.addToCart$.next(product);
  }

  // Change active flattening operator
  onSetOperator(op: 'concatMap' | 'mergeMap' | 'switchMap' | 'exhaustMap') {
    this.cartService.setOperator(op);
  }

  // Update item quantity in the cart drawer
  onUpdateQuantity(product: Product, change: number) {
    this.cartService.updateQuantity(product, change);
  }

  // Reset logger console
  onClearLogs() {
    this.cartService.clearLogs();
  }

  // Check how many items of this product can be added
  getAvailableStock(product: Product): number {
    return this.cartService.getAvailableStock(product);
  }

  // Calculate cart total summary
  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }
}
