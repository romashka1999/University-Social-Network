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
import { CommentsModule } from './modules/comments/comments.module';
import { AdminRolesModule } from './modules/admin-roles/admin-roles.module';
import { AdminPermissionsModule } from './modules/admin-permissions/admin-permissions.module';
import { CommentReactsModule } from './modules/comment-reacts/comment-reacts.module';
import { RepliesModule } from './modules/replies/replies.module';
import { ReplyReactsModule } from './modules/reply-reacts/reply-reacts.module';


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
    PostReactsModule,
    CommentsModule,
    CommentReactsModule,
    RepliesModule,
    ReplyReactsModule,
    MessagesModule,
    ChatsModule,
    AdminsModule,
    AdminRolesModule,
    AdminPermissionsModule,
    TranslationsModule,
  ],
  providers: []
})
export class AppModule { }
