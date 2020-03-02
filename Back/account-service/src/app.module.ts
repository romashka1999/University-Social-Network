import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { tpeOrmConfig } from './config/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }), 
  TypeOrmModule.forRoot(tpeOrmConfig),
  MongooseModule.forRoot(process.env.MONGO_URI),
  UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
