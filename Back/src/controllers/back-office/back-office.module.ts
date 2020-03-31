import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [UsersController]
})
export class BackOfficeModule {}
