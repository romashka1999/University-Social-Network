import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserRepository } from 'src/modules/users/user.repository';
import { UsersController, CMSUsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { FollowersModule } from '../followers/followers.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => FollowersModule),
  ],
  controllers: [
    UsersController,
    CMSUsersController
  ],
  providers: [UsersService],
  exports: [
    UsersService,
    TypeOrmModule
  ]
})
export class UsersModule {}
