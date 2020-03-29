import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/user.module';
import { AdminsModule } from './modules/admins/admins.module';
import { AuthModule } from './modules/auth/auth.module';

console.log(typeOrmConfig);
@Module({
  imports: [
  TypeOrmModule.forRoot(typeOrmConfig),
  // MongooseModule.forRoot(process.env.MONGO_URI),
  UsersModule,
  AdminsModule,
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
