import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';

console.log(typeOrmConfig);
@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }), 
  TypeOrmModule.forRoot(typeOrmConfig),
  // MongooseModule.forRoot(process.env.MONGO_URI),
  UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
