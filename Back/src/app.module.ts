import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdminsModule } from './modules/admins/admins.module';
import { TranslationsModule } from './modules/translations/translations.module';
import { PostReactsModule } from './modules/post-reacts/post-reacts.module';
import { FollowersModule } from './modules/followers/followers.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    FollowersModule,
    PostsModule,
    AdminsModule,
    TranslationsModule,
    PostReactsModule
  ],
  providers: []
})
export class AppModule {}
