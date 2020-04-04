import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { PostsService } from './posts.service';
import { PostRepository } from './post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [PostsService],
  exports: [
    PostsService,
    TypeOrmModule
  ]
})
export class PostsModule {}
