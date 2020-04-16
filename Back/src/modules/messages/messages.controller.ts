import { Controller, UseGuards, Get, Query, ValidationPipe, Post, Body, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/response-creator';
import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { MessagesService } from './messages.service';
import { GetMessagesFilterDto } from './dto/get-messages.filter.dto';
import { SendMessageDto } from './dto/send-message.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('messages')
@Controller('public/messages')
@UseGuards(AuthGuard())
export class MessagesController {

    constructor(private readonly messagesService: MessagesService) {}

    @Get('/chat/:chatId')
    public async getChatMessages(
        @GetUser() user: User,
        @Param('chatId') chatId: string,
        @Query(ValidationPipe) getMessagesFilterDto: GetMessagesFilterDto): Promise<ResponseCreator> {
        const gotData = await this.messagesService.getChatMessages(user.id, chatId, getMessagesFilterDto);
        return new ResponseCreator("MESSAGES_GOT", gotData);
    }

    @Post('/chat/:chatId')
    public async sendMessageToUser(
        @GetUser() user: User,
        @Param('chatId') chatId: string,
        @Body(ValidationPipe) sendMessageDto: SendMessageDto): Promise<ResponseCreator> {
        const createdData = await this.messagesService.sendMessageToChat(user.id, chatId, sendMessageDto);
        return new ResponseCreator("MESSAGE_SENT", createdData);
    }

    @Delete('/:messageId')
    public async deleteMessage(
        @GetUser() user: User,
        @Param('messageId') messageId: string): Promise<ResponseCreator> {
        const deletedData = await this.messagesService.deleteMessageFromChat(user.id, messageId);
        return new ResponseCreator("MESSAGE_DELETED", deletedData);
    }
    
}
