import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { AdminPermissionsModule } from './modules/admin-permissions/admin-permissions.module';
import { AdminRolesModule } from './modules/admin-roles/admin-roles.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TranslationsModule } from './modules/translations/translations.module';


 

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    AdminsModule,
    AdminPermissionsModule,
    AdminRolesModule,
    PostsModule,
    CommentsModule,
    TranslationsModule
  ]
})
export class AppModule {}
