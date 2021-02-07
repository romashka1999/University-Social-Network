import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentReactRepository } from './comment-react.repository';
import { CommentReactsService } from './comment-reacts.service';
import { UsersModule } from '../users/users.module';
import { FollowersModule } from '../followers/followers.module';
import { PostsModule } from '../posts/posts.module';
import { CommentReactsController } from './comment-reacts.controller';
import { AuthModule } from '../auth/auth.module';
import { PostsGateway } from 'src/sockets/posts.gateway';
import { CommentsModule } from '../comments/comments.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentReactRepository]),
        AuthModule,
        UsersModule,
        FollowersModule,
        CommentsModule,
        PostsModule
    ],
    providers: [CommentReactsService, PostsGateway],
    controllers: [CommentReactsController],
    exports: [
        CommentReactsService,
        TypeOrmModule
    ]
})
export class CommentReactsModule { }
