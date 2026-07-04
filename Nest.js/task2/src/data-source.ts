import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CustomLogger } from './logger/custom-logger';
import { Order } from './orders/entities/order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  entities: [Order],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false, // MUST BE FALSE when using migrations
  logging: true,
  logger: new CustomLogger(),
});
