import { Injectable } from '@nestjs/common';
import { Order, PaymentMethod } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { GetOrdersFilterDto } from './dtos/get-orders-filter.dto';
import { v4 as uuidv4 } from 'uuid';

import { rawOrders } from './data';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  constructor() {
    if (Array.isArray(rawOrders)) {
      this.orders = rawOrders.map((raw) => {
        const order = new Order();
        order.id = raw.id;
        order.amount = raw.amount;
        order.longitude = raw.longitude;
        order.latitude = raw.latitude;
        order.clientId = raw.ClientId;
        order.paymentMethod = raw.PaymentMethod;
        return order;
      });
    }
  }



  getAllOrders(filters: GetOrdersFilterDto): Order[] {
    let result = [...this.orders];

    if (filters.clientId !== undefined && filters.clientId !== null) {
      result = result.filter((order) => order.clientId === filters.clientId);
    }

    if (filters.paymentMethod !== undefined && filters.paymentMethod !== null) {
      const normalizedFilter = filters.paymentMethod;
      result = result.filter((order) => order.paymentMethod === normalizedFilter);
    }

    return result;
  }

  getOrderById(id: string): Order | null {
    const order = this.orders.find((o) => o.id === id);
    return order || null;
  }

  createOrder(createOrderDto: CreateOrderDto): Order {
    const newOrder = new Order();
    newOrder.id = uuidv4();
    newOrder.amount = createOrderDto.amount;
    newOrder.longitude = createOrderDto.longitude;
    newOrder.latitude = createOrderDto.latitude;
    newOrder.clientId = createOrderDto.clientId;
    newOrder.paymentMethod = createOrderDto.paymentMethod;

    this.orders.push(newOrder);
    return newOrder;
  }

  updateOrder(id: string, updateOrderDto: UpdateOrderDto): Order | null {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      return null;
    }

    if (updateOrderDto.amount !== undefined) {
      order.amount = updateOrderDto.amount;
    }
    if (updateOrderDto.longitude !== undefined) {
      order.longitude = updateOrderDto.longitude;
    }
    if (updateOrderDto.latitude !== undefined) {
      order.latitude = updateOrderDto.latitude;
    }
    if (updateOrderDto.clientId !== undefined) {
      order.clientId = updateOrderDto.clientId;
    }
    if (updateOrderDto.paymentMethod !== undefined) {
      order.paymentMethod = updateOrderDto.paymentMethod;
    }

    return order;
  }

  deleteOrder(id: string): boolean {
    const initialLength = this.orders.length;
    this.orders = this.orders.filter((o) => o.id !== id);
    return this.orders.length < initialLength;
  }
}
