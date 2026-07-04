import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderRepository } from './repositories/order.repository';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    AuthModule,
    ProductsModule,
  ],
  providers: [OrdersService, OrderRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
