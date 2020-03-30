import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
    imports: [
        UsersModule,
        PostsModule,
        CommentsModule
    ],
    exports: [
        UsersModule,
        PostsModule,
        CommentsModule
    ]
})
export class PublicModule {}
