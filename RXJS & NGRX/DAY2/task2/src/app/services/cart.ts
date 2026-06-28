import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, combineLatest, of, Observable } from 'rxjs';
import { 
  map, 
  switchMap, 
  mergeMap, 
  concatMap, 
  exhaustMap, 
  tap, 
  catchError, 
  startWith, 
  debounceTime, 
  distinctUntilChanged, 
  delay 
} from 'rxjs/operators';
import { Product, CartItem, LogEntry } from '../types/product';
import { Notifications } from './notifiactions';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private notificationServ = inject(Notifications);

  // Shared state: BehaviorSubjects
  private productsSubj$ = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubj$.asObservable();

  private cartSubj$ = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubj$.asObservable();

  private loadingSubj$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubj$.asObservable();

  private errorSubj$ = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubj$.asObservable();

  private operatorSubj$ = new BehaviorSubject<'concatMap' | 'mergeMap' | 'switchMap' | 'exhaustMap'>('concatMap');
  operator$ = this.operatorSubj$.asObservable();

  private logsSubj$ = new BehaviorSubject<LogEntry[]>([]);
  logs$ = this.logsSubj$.asObservable();

  // Event subjects
  search$ = new Subject<string>();
  addToCart$ = new Subject<Product>();
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor() {
    this.initSearchPipeline();
    this.initAddToCartPipeline();
  }

  // Gets the quantity of a product currently in the cart
  getCartQuantity(product: Product): number {
    const item = this.cartSubj$.value.find(c => c.product.id === product.id);
    return item ? item.quantity : 0;
  }

  // Gets the available stock for a product (total stock - quantity in cart)
  getAvailableStock(product: Product): number {
    return product.stock - this.getCartQuantity(product);
  }

  // Set the active flattening operator
  setOperator(op: 'concatMap' | 'mergeMap' | 'switchMap' | 'exhaustMap') {
    this.operatorSubj$.next(op);
  }

  // Clear log console
  clearLogs() {
    this.logsSubj$.next([]);
  }

  // Add a message to the logging stream
  private addLog(message: string, type: 'info' | 'success' | 'warning' | 'error') {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    this.logsSubj$.next([newLog, ...this.logsSubj$.value]);
  }

  // Trigger manual refresh
  refreshProducts() {
    this.refreshTrigger$.next();
  }

  // Cart operations
  updateQuantity(product: Product, change: number) {
    const currentCart = [...this.cartSubj$.value];
    const index = currentCart.findIndex(item => item.product.id === product.id);
    
    if (index > -1) {
      const newQty = currentCart[index].quantity + change;
      if (newQty <= 0) {
        currentCart.splice(index, 1);
        this.addLog(`Removed "${product.title}" from cart`, 'warning');
      } else {
        if (newQty > product.stock) {
          this.addLog(`Cannot increase quantity: "${product.title}" has only ${product.stock} items in stock.`, 'error');
          return;
        }
        currentCart[index] = { ...currentCart[index], quantity: newQty };
        this.addLog(`Updated "${product.title}" quantity to ${newQty}`, 'info');
      }
      this.cartSubj$.next(currentCart);
    }
  }

  // Get total cart price
  getCartTotal(): number {
    return this.cartSubj$.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  // Get total item count
  getCartCount(): number {
    return this.cartSubj$.value.reduce((count, item) => count + item.quantity, 0);
  }

  // Search pipeline: Fetches products from DummyJSON Products API
  private initSearchPipeline() {
    const searchQuery$ = this.search$.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    );

    combineLatest([this.refreshTrigger$, searchQuery$]).pipe(
      tap(() => {
        this.loadingSubj$.next(true);
        this.errorSubj$.next(null);
      }),
      switchMap(([_, query]) => {
        const url = query.trim()
          ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
          : `https://dummyjson.com/products`;

        return this.http.get<{ products: Product[] }>(url).pipe(
          catchError((err) => {
            this.errorSubj$.next(err.message || 'Failed to fetch products from the API.');
            return of({ products: [] as Product[] });
          })
        );
      }),
      tap(() => this.loadingSubj$.next(false))
    ).subscribe({
      next: (res) => {
        this.productsSubj$.next(res.products);
      },
      error: (err) => {
        console.error('Products fetch error:', err);
        this.errorSubj$.next(err.message || 'An unexpected error occurred.');
      }
    });
  }

  // Add to cart pipeline: demonstrates RxJS flattening operators
  private initAddToCartPipeline() {
    this.operator$.pipe(
      switchMap((op) => {
        this.addLog(`Pipeline updated: Now using "${op}" flattening operator`, 'info');
        
        // Dynamically delegate based on active operator
        if (op === 'concatMap') {
          return this.addToCart$.pipe(
            concatMap((product) => this.simulatedAddToCartApiCall(product))
          );
        } else if (op === 'mergeMap') {
          return this.addToCart$.pipe(
            mergeMap((product) => this.simulatedAddToCartApiCall(product))
          );
        } else if (op === 'switchMap') {
          return this.addToCart$.pipe(
            switchMap((product) => this.simulatedAddToCartApiCall(product))
          );
        } else {
          return this.addToCart$.pipe(
            exhaustMap((product) => this.simulatedAddToCartApiCall(product))
          );
        }
      })
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.executeCartAddition(res.product);
        } else {
          this.notificationServ.sendNotification({
            id: Date.now(),
            title: 'Action Prevented',
            message: res.errorMsg || 'Could not add item.',
            type: 'warning',
            createdAt: new Date(),
          });
        }
      },
      error: (err) => {
        console.error('Add to Cart pipeline error:', err);
        this.addLog(`Pipeline Error: ${err.message}`, 'error');
      }
    });
  }

  // Simulates a backend request to add item to remote database (takes 1.5 seconds)
  private simulatedAddToCartApiCall(product: Product): Observable<{ product: Product; success: boolean; errorMsg?: string }> {
    const clickId = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.addLog(`[ID: ${clickId}] User clicked "Add to Cart" for "${product.title}"`, 'info');

    // Client-side quick check
    const availableStock = this.getAvailableStock(product);
    if (availableStock <= 0) {
      this.addLog(`[ID: ${clickId}] Instantly Rejected: "${product.title}" is out of stock!`, 'error');
      return of({ product, success: false, errorMsg: `"${product.title}" is out of stock!` });
    }

    this.addLog(`[ID: ${clickId}] Network request STARTED for "${product.title}" (1.5s delay)`, 'info');

    return of(product).pipe(
      delay(1500),
      map((p) => {
        // Recheck stock inside mapped timer execution in case of parallel requests
        const freshAvailableStock = this.getAvailableStock(p);
        if (freshAvailableStock <= 0) {
          this.addLog(`[ID: ${clickId}] Network request FINISHED but item became out of stock!`, 'error');
          return { product: p, success: false, errorMsg: `Stock exhausted for "${p.title}".` };
        }

        this.addLog(`[ID: ${clickId}] Network request COMPLETED for "${product.title}"`, 'success');
        return { product: p, success: true };
      }),
      catchError((err) => {
        this.addLog(`[ID: ${clickId}] Network request FAILED: ${err.message}`, 'error');
        return of({ product, success: false, errorMsg: err.message || 'Network error.' });
      })
    );
  }

  // Perform final client-side cart addition state modification
  private executeCartAddition(product: Product) {
    const currentCart = [...this.cartSubj$.value];
    const index = currentCart.findIndex(item => item.product.id === product.id);

    if (index > -1) {
      currentCart[index] = {
        ...currentCart[index],
        quantity: currentCart[index].quantity + 1,
      };
    } else {
      currentCart.push({ product, quantity: 1 });
    }

    this.cartSubj$.next(currentCart);

    // Send success notification to show in Toast
    this.notificationServ.sendNotification({
      id: Date.now(),
      title: 'Added to Cart',
      message: `"${product.title}" added to your cart successfully!`,
      type: 'success',
      createdAt: new Date(),
    });
  }
}
