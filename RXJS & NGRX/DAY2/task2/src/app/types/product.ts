export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
