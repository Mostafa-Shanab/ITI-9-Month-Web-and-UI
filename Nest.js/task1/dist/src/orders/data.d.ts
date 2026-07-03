export const rawOrders: {
    id: string;
    amount: number;
    longitude: number;
    latitude: number;
    ClientId: number;
    PaymentMethod: PaymentMethod;
}[];
import { PaymentMethod } from './entities/order.entity';
