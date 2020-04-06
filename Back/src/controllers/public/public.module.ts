import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from 'src/modules/posts/posts.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule
  ],
  controllers: [
    UsersController, 
    PostsController
  ]
})
export class PublicModule {}
