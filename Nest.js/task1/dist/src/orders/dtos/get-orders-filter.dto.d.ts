import { PaymentMethod } from '../entities/order.entity';
export declare class GetOrdersFilterDto {
    clientId?: number;
    paymentMethod?: PaymentMethod;
}
