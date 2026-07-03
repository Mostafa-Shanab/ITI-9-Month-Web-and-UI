import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { GetOrdersFilterDto } from './dtos/get-orders-filter.dto';
export declare class OrdersService {
    private orders;
    constructor();
    getAllOrders(filters: GetOrdersFilterDto): Order[];
    getOrderById(id: string): Order | null;
    createOrder(createOrderDto: CreateOrderDto): Order;
    updateOrder(id: string, updateOrderDto: UpdateOrderDto): Order | null;
    deleteOrder(id: string): boolean;
}
