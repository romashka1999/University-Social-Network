import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './comments.service';
import { CommentRepository } from './comments.repository';
import { AuthModule } from '../auth/auth.module';
import { CommentsController } from './comments.controller';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';
import { FollowersModule } from '../followers/followers.module';
import { PostsGateway } from 'src/sockets/posts.gateway';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentRepository]),
        AuthModule,
        PostsModule,
        UsersModule,
        FollowersModule
    ],
    providers: [CommentsService, PostsGateway],
    controllers: [CommentsController],
    exports: [
        CommentsService,
        TypeOrmModule
    ]
})
export class CommentsModule { }
