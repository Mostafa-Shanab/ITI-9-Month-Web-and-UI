import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto, user);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }
}
