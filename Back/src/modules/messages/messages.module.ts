import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageSchema } from './message.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Message', schema: MessageSchema}]),
        AuthModule,
        UsersModule
    ],
    providers: [MessagesService],
    controllers: [MessagesController]
})
export class MessagesModule {}
