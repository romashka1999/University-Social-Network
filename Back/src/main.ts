import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  const serverConfig = config.get('server');
  const PORT = serverConfig.port;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.log(`API listening to the port: ${PORT}`, 'bootstrap')
}
bootstrap();
