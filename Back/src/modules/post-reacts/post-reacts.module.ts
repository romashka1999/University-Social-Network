import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostReactRepository } from './post-react.repository';
import { PostReactsService } from './post-reacts.service';
import { UsersModule } from '../users/users.module';
import { FollowersModule } from '../followers/followers.module';
import { PostsModule } from '../posts/posts.module';
import { PostReactsController } from './post-reacts.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostReactRepository]), 
        AuthModule,
        UsersModule, 
        FollowersModule, 
        PostsModule
    ],
    providers: [PostReactsService],
    controllers: [PostReactsController],
    exports: [
        PostReactsService,
        TypeOrmModule
    ]
})
export class PostReactsModule {}
