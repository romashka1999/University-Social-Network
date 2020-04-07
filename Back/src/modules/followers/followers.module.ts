import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { FollowersService } from './followers.service';
import { FollowerRepository } from './follower.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FollowerRepository]), UsersModule],
  providers: [FollowersService],
  exports: [
    FollowersService,
    TypeOrmModule
  ]
})
export class FollowersModule {}
