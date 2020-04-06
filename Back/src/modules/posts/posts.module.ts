import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { PostsService } from './posts.service';
import { PostRepository } from './post.repository';
import { UsersModule } from '../users/users.module';
import { FollowersModule } from '../followers/followers.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), UsersModule, FollowersModule],
  providers: [PostsService],
  exports: [
    PostsService,
    TypeOrmModule
  ]
})
export class PostsModule {}
