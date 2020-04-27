import { Controller, UseGuards, Get, Query, ValidationPipe, Post, Body, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';


import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { SendMessageDto } from '../messages/dto/send-message.dto';
import { GetAdmin } from '../auth/get-account-data.decorator';
import { Admin } from '../admins/admin.entity';
import { AdminChatService } from './admin-chat.service';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('/backOffice/adminChat')
@Controller('/backOffice/adminChat')
@UseGuards(AuthGuard())
export class AdminChatController {

    constructor(private readonly adminChatService: AdminChatService) {}

    @Get()
    public async getChatMessages(
        @GetAdmin() admin: Admin,
        @Query(ValidationPipe) StrictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.adminChatService.getChatMessages(admin.id, StrictPaginationGetFilterDto);
        return new ResponseCreator("MESSAGES_GOT", gotData);
    }

    @Post()
    public async sendMessageToChat(
        @GetAdmin() admin: Admin,
        @Body(ValidationPipe) sendMessageDto: SendMessageDto): Promise<ResponseCreator> {
        const createdData = await this.adminChatService.sendMessageToChat(admin, sendMessageDto);
        return new ResponseCreator("MESSAGE_SENT", createdData);
    }

    // @Delete('/:messageId')
    // public async deleteMessage(
    //     @GetUser() user: User,
    //     @Param('messageId') messageId: string): Promise<ResponseCreator> {
    //     const deletedData = await this.adminChatService.deleteMessageFromChat(user.id, messageId);
    //     return new ResponseCreator("MESSAGE_DELETED", deletedData);
    // }
    
}
