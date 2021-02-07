import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatSchema } from './chat.entity';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Chat', schema: ChatSchema}]),
        AuthModule,
        UsersModule
    ],
    providers: [ChatsService],
    controllers: [ChatsController],
    exports: [
        ChatsService
    ]
})
export class ChatsModule {}
