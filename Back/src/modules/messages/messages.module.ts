import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageSchema } from './message.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { AuthModule } from '../auth/auth.module';
import { ChatsModule } from '../chats/chats.module';
import { ChatsGateway } from 'src/chat.gateway';
import { FollowersModule } from '../followers/followers.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]),
        AuthModule,
        ChatsModule,
    ],
    providers: [MessagesService, ChatsGateway],
    controllers: [MessagesController]
})
export class MessagesModule {}
