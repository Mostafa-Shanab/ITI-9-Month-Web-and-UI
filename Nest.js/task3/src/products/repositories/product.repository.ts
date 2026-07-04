import { DataSource, Repository, In } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product-dto';

@Injectable()
export class ProductRepository {
  private repo: Repository<Product>;
  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Product);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price } = createProductDto;
    const product = this.repo.create({ name, price });
    return await this.repo.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.repo.find();
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    if (!ids || ids.length === 0) return [];
    return await this.repo.findBy({ id: In(ids) });
  }
}
