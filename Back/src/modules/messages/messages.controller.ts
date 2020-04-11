import { Controller, UseGuards, Get, Query, ValidationPipe, Post, Body, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/response-creator';
import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { MessagesService } from './messages.service';
import { GetMessagesFilterDto } from './dto/get-messages.filter.dto';
import { SendMessageDto } from './dto/send-message.dto';



@Controller('public/messages')
@UseGuards(AuthGuard())
export class MessagesController {

    constructor(private readonly messagesService: MessagesService) {}

    @Get('/user/:userId')
    public async getUserMessages(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number,
        @Query(ValidationPipe) getMessagesFilterDto: GetMessagesFilterDto): Promise<ResponseCreator> {
        const gotData = await this.messagesService.getUserMessages(user.id, userId, getMessagesFilterDto);
        return new ResponseCreator("MESSAGES_GOT", gotData);
    }

    @Post('/user/:userId')
    public async sendMessageToUser(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number,
        @Body(ValidationPipe) sendMessageDto: SendMessageDto): Promise<ResponseCreator> {
        const createdData = await this.messagesService.sendMessageToUser(user.id, userId, sendMessageDto);
        return new ResponseCreator("MESSAGE_SENT", createdData);
    }

    @Delete('/:messageId')
    public async deleteMessage(
        @GetUser() user: User,
        @Param('messageId') messageId: string): Promise<ResponseCreator> {
        const deletedData = await this.messagesService.deleteMessage(user.id, messageId);
        return new ResponseCreator("MESSAGE_DELETED", deletedData);
    }
    
}
