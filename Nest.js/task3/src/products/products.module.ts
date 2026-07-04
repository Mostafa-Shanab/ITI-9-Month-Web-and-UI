import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule,
  ],
  providers: [ProductsService, ProductRepository],
  controllers: [ProductsController],
  exports: [ProductsService, ProductRepository],
})
export class ProductsModule {}
