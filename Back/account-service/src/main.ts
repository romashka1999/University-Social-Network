import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT);
  Logger.log(`account-service listening to the port: ${process.env.SERVER_PORT}`, 'bootstrap')
}
bootstrap();
