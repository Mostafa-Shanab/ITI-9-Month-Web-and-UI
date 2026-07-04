// src/data-source.ts
import { DataSource } from 'typeorm';
import { CustomLogger } from './logger/custom-logger';
import { Project } from './tasks/entities/project.entity';
import { Task } from './tasks/entities/task.entity';
import { User } from './auth/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1111',
  database: 'tasks-management-4',
  entities: [Task, User, Project], // Add all your entities
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  migrationsTableName: 'typeorm_migrations', // Optional custom name
  synchronize: false, // MUST BE FALSE when using migrations
  logging: true, // Enable SQL query logging (optional)
  logger: new CustomLogger(),
});