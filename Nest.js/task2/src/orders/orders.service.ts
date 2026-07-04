import { Injectable } from "@nestjs/common";
import { Order } from "./entities/order.entity";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UpdateOrderDto } from "./dtos/update-order.dto";
import { GetOrdersFilterDto } from "./dtos/get-orders-filter.dto";
import { OrderRepository } from "./repositories/order.repository";

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAllOrders(filters: GetOrdersFilterDto): Promise<Order[]> {
    return await this.orderRepository.getAllOrders(filters);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return await this.orderRepository.getOrderById(id);
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.createOrder(createOrderDto);
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    return await this.orderRepository.updateOrder(id, updateOrderDto);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return await this.orderRepository.deleteOrder(id);
  }
}
