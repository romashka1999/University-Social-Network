import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminChatSchema } from './admin-chat.entity';
import { AdminChatService } from './admin-chat.service';
import { AdminChatController } from './admin-chat.controller';
import { AuthModule } from '../auth/auth.module';
import { AdminChatGateway } from 'src/sockets/admin-chat.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'AdminChat', schema: AdminChatSchema}]),
        AuthModule,
    ],
    providers: [AdminChatService, AdminChatGateway],
    controllers: [AdminChatController]
})
export class AdminChatModule {}
