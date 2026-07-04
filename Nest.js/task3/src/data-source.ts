import { DataSource } from 'typeorm';
import { CustomLogger } from './logger/custom-logger';
import { User } from './auth/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1111',
  database: process.env.DB_DATABASE || 'tasks-management',
  entities: [User, Product, Order],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  logging: true,
  logger: new CustomLogger(),
});
