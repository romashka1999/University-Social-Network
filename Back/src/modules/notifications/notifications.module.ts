import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { NotificationsService } from './notifications.service';
import { NotificationRepository } from './notification.repository';
import { NotificationsController } from './notifications.controller';
import { AuthModule } from '../auth/auth.module';
import { FollowersModule } from '../followers/followers.module';
import { ChatsModule } from '../chats/chats.module';
import { NotificationsGateway } from 'src/sockets/notifications.gateway';


@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationRepository]), 
    AuthModule,
    FollowersModule,
    ChatsModule
  ],
  controllers: [
    NotificationsController
  ],
  providers: [
    NotificationsService,
    NotificationsGateway
  ],
  exports: [
    NotificationsService,
    TypeOrmModule
  ]
})
export class NotificationsModule {}
