import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsModule } from './modules/admins/admins.module';

console.log(typeOrmConfig);
@Module({
  imports: [
  TypeOrmModule.forRoot(typeOrmConfig),
  // MongooseModule.forRoot(process.env.MONGO_URI),
  UsersModule,
  AdminsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
