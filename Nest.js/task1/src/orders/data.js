import { v4 as uuid } from 'uuid';
import { PaymentMethod } from './entities/order.entity';

export const rawOrders = [
  { id: uuid(), amount: 1230.50, longitude: 23.21, latitude: 31.01, ClientId: 1, PaymentMethod: PaymentMethod.CASH },
  { id: uuid(), amount: 450.00, longitude: 23.25, latitude: 31.05, ClientId: 2, PaymentMethod: PaymentMethod.VISA },
  { id: uuid(), amount: 89.90, longitude: 23.30, latitude: 31.10, ClientId: 1, PaymentMethod: PaymentMethod.CASH }
];
