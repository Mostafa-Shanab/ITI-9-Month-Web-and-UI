import { PaymentMethod } from '../entities/order.entity';
export declare class UpdateOrderDto {
    amount?: number;
    longitude?: number;
    latitude?: number;
    clientId?: number;
    paymentMethod?: PaymentMethod;
}
