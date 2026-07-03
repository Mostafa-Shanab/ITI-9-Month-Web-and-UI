import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { GetOrdersFilterDto } from './dtos/get-orders-filter.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAllOrders(@Query() filters: GetOrdersFilterDto): Order[] {
    return this.ordersService.getAllOrders(filters);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string): Order {
    const order = this.ordersService.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return order;
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Order {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Put(':id')
  updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Order {
    const updatedOrder = this.ordersService.updateOrder(id, updateOrderDto);
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return updatedOrder;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteOrder(@Param('id') id: string): void {
    const wasDeleted = this.ordersService.deleteOrder(id);
    if (!wasDeleted) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
  }
}
