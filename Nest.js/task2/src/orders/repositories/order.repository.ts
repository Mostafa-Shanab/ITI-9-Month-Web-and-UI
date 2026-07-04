import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { UpdateOrderDto } from "../dtos/update-order.dto";
import { GetOrdersFilterDto } from "../dtos/get-orders-filter.dto";

@Injectable()
export class OrderRepository {
  private repo: Repository<Order>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Order);
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.repo.create({
      amount: createOrderDto.amount,
      longitude: createOrderDto.longitude,
      latitude: createOrderDto.latitude,
      clientId: createOrderDto.clientId,
      paymentMethod: createOrderDto.paymentMethod,
    });
    return await this.repo.save(order);
  }

  async getAllOrders(filters: GetOrdersFilterDto): Promise<Order[]> {
    const query = this.repo.createQueryBuilder("order");

    if (filters.clientId !== undefined && filters.clientId !== null) {
      query.andWhere("order.clientId = :clientId", {
        clientId: filters.clientId,
      });
    }

    if (filters.paymentMethod !== undefined && filters.paymentMethod !== null) {
      query.andWhere("order.paymentMethod = :paymentMethod", {
        paymentMethod: filters.paymentMethod,
      });
    }

    return await query.getMany();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return await this.repo.findOneBy({ id });
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    const order = await this.repo.findOneBy({ id });
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

    return await this.repo.save(order);
  }

  async deleteOrder(id: string): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected != null && deleteResult.affected > 0;
  }
}
