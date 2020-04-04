import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule
  ],
  controllers: [UsersController]
})
export class PublicModule {}
