import { PaymentMethod } from '../entities/order.entity';
export declare class CreateOrderDto {
    amount: number;
    longitude: number;
    latitude: number;
    clientId: number;
    paymentMethod: PaymentMethod;
}
