import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReplyReactRepository } from './reply-react.repository';
import { ReplyReactsService } from './reply-reacts.service';
import { UsersModule } from '../users/users.module';
import { FollowersModule } from '../followers/followers.module';
import { PostsModule } from '../posts/posts.module';
import { ReplyReactsController } from './reply-reacts.controller';
import { AuthModule } from '../auth/auth.module';
import { PostsGateway } from 'src/sockets/posts.gateway';
import { CommentsModule } from '../comments/comments.module';
import { RepliesModule } from '../replies/replies.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReplyReactRepository]),
        AuthModule,
        UsersModule,
        FollowersModule,
        CommentsModule,
        PostsModule,
        RepliesModule
    ],
    providers: [ReplyReactsService, PostsGateway],
    controllers: [ReplyReactsController],
    exports: [
        ReplyReactsService,
        TypeOrmModule
    ]
})
export class ReplyReactsModule { }
