import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // In that case, i will not need to import ConfigModule in other modules once it's been loaded in the root module
    }), // add ConfigModule for set up configuration, by default root .env file
    AuthModule, 
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
