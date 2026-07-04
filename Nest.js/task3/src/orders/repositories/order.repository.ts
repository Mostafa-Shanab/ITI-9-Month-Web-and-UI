import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  private repo: Repository<Order>;
  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Order);
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const order = this.repo.create(orderData);
    return await this.repo.save(order);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['client', 'products'],
    });
  }
}
