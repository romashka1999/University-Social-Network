import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


import * as config from 'config';
import { AppModule } from './app.module';
const cors = require('cors');
const fileUpload = require('express-fileupload');

async function bootstrap() {
  const serverConfig = config.get('server');
  const PORT = serverConfig.port;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Social Network API')
    .setDescription('Social Newtork CRUD api')
    .setVersion('1.0.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, doc);
  
  app.use(cors());
  app.use(fileUpload());

  if(process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  
  await app.listen(PORT);
  Logger.log(`app listening to port: ${PORT}`, 'bootsrap');
}
bootstrap();
