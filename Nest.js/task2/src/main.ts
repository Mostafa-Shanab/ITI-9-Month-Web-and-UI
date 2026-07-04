import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipes for DTO validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Configure Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('TechXpress API')
    .setDescription('TechXpress Order Management API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Write swagger.json to root directory
  writeFileSync(
    join(process.cwd(), 'swagger.json'),
    JSON.stringify(document, null, 2),
  );

  SwaggerModule.setup('swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available on: http://localhost:${port}/swagger`);
}
bootstrap();
