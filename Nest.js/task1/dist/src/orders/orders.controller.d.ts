import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { GetOrdersFilterDto } from './dtos/get-orders-filter.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(filters: GetOrdersFilterDto): Order[];
    getOrderById(id: string): Order;
    createOrder(createOrderDto: CreateOrderDto): Order;
    updateOrder(id: string, updateOrderDto: UpdateOrderDto): Order;
    deleteOrder(id: string): void;
}
