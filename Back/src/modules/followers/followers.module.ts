import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { FollowersService } from './followers.service';
import { FollowerRepository } from './follower.repository';
import { UsersModule } from '../users/users.module';
import { FollowersController } from './followers.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FollowerRepository]),
    AuthModule,
    UsersModule
  ],
  providers: [FollowersService],
  controllers: [FollowersController],
  exports: [
    FollowersService,
    TypeOrmModule
  ]
})
export class FollowersModule {}
