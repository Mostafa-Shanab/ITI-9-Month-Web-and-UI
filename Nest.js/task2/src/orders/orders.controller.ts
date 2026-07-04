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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { Order } from "./entities/order.entity";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UpdateOrderDto } from "./dtos/update-order.dto";
import { GetOrdersFilterDto } from "./dtos/get-orders-filter.dto";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: "Get all orders with optional filters" })
  @ApiResponse({
    status: 200,
    description: "Return all orders matching the criteria.",
    type: [Order],
  })
  async getAllOrders(@Query() filters: GetOrdersFilterDto): Promise<Order[]> {
    return await this.ordersService.getAllOrders(filters);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an order by its ID" })
  @ApiResponse({
    status: 200,
    description: "Return the order with the specified ID.",
    type: Order,
  })
  @ApiResponse({ status: 404, description: "Order not found." })
  async getOrderById(@Param("id") id: string): Promise<Order> {
    const order = await this.ordersService.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return order;
  }

  @Post()
  @ApiOperation({ summary: "Create a new order" })
  @ApiResponse({
    status: 201,
    description: "The order has been successfully created.",
    type: Order,
  })
  @ApiResponse({ status: 400, description: "Invalid input payload." })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.ordersService.createOrder(createOrderDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update an existing order" })
  @ApiResponse({
    status: 200,
    description: "The order has been successfully updated.",
    type: Order,
  })
  @ApiResponse({ status: 400, description: "Invalid input payload." })
  @ApiResponse({ status: 404, description: "Order not found." })
  async updateOrder(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const updatedOrder = await this.ordersService.updateOrder(
      id,
      updateOrderDto,
    );
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return updatedOrder;
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiOperation({ summary: "Delete an order" })
  @ApiResponse({
    status: 204,
    description: "The order has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Order not found." })
  async deleteOrder(@Param("id") id: string): Promise<void> {
    const wasDeleted = await this.ordersService.deleteOrder(id);
    if (!wasDeleted) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
  }
}
