import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './repositories/order.repository';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dtos/create-order-dto';
import { Order } from './entities/order.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productsService: ProductsService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, client: User): Promise<Order> {
    const { amount, longitude, latitude, paymentMethod, productIds } = createOrderDto;

    const products = await this.productsService.findProductsByIds(productIds);

    if (products.length === 0) {
      throw new NotFoundException('No valid products found for the provided IDs');
    }

    const order = await this.orderRepository.createOrder({
      amount,
      longitude,
      latitude,
      paymentMethod,
      client,
      products,
    });

    if (order.client) {
      delete (order.client as any).password;
    }

    return order;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.getOrderById(id);

    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    if (order.client) {
      delete (order.client as any).password;
    }

    return order;
  }
}
