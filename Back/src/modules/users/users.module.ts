import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserRepository } from 'src/modules/users/user.repository';


@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService],
  exports: [
    UsersService,
    TypeOrmModule
  ]
})
export class UsersModule {}
