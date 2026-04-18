export interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  isInCart: boolean;
  status?: status;
}

type status = 'active' | 'inactive';

export type error = {
  message: string;
  state: boolean;
};

export type tabName = 'all' | 'cart';
