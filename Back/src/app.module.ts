import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import * as config from 'config';

const dbConfig = config.get('db');

import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdminsModule } from './modules/admins/admins.module';
import { TranslationsModule } from './modules/translations/translations.module';
import { PostReactsModule } from './modules/post-reacts/post-reacts.module';
import { FollowersModule } from './modules/followers/followers.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ChatsModule } from './modules/chats/chats.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot('mongodb://roma:roma123@ds115493.mlab.com:15493/heroku_9xznllvz', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    UsersModule,
    FollowersModule,
    PostsModule,
    AdminsModule,
    TranslationsModule,
    PostReactsModule,
    MessagesModule,
    ChatsModule
  ],
  providers: []
})
export class AppModule {}
