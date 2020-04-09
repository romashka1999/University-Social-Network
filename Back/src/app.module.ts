import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppGateway } from './app.gateway';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdminsModule } from './modules/admins/admins.module';
import { TranslationsModule } from './modules/translations/translations.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    PostsModule,
    AdminsModule,
    TranslationsModule
  ],
  providers: [AppGateway]
})
export class AppModule {}
