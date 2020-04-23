import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepliesService } from './replies.service';
import { ReplyRepository } from './reply.repository';
import { AuthModule } from '../auth/auth.module';
import { RepliesController } from './replies.controller';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';
import { FollowersModule } from '../followers/followers.module';
import { PostsGateway } from 'src/sockets/posts.gateway';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReplyRepository]),
        AuthModule,
        PostsModule,
        UsersModule,
        FollowersModule
    ],
    providers: [RepliesService, PostsGateway],
    controllers: [RepliesController],
    exports: [
        RepliesService,
        TypeOrmModule
    ]
})
export class RepliesModule { }
