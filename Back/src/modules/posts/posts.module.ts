import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { PostsService } from './posts.service';
import { PostRepository } from './post.repository';
import { UsersModule } from '../users/users.module';
import { FollowersModule } from '../followers/followers.module';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';
import { AppGateway } from 'src/app.gateway';
import { RedisStoreClientService } from 'src/redis-store-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), AuthModule, UsersModule, FollowersModule],
  controllers: [
    PostsController
  ],
  providers: [PostsService, AppGateway, RedisStoreClientService],
  exports: [
    PostsService,
    TypeOrmModule
  ]
})
export class PostsModule {}
