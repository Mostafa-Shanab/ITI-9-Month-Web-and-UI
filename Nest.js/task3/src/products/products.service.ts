import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dtos/create-product-dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async findProductsByIds(ids: string[]): Promise<Product[]> {
    return this.productRepository.findByIds(ids);
  }
}
