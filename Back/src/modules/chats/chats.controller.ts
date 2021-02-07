import { Controller, UseGuards, Get, Query, ValidationPipe, ParseIntPipe, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { ChatsService } from './chats.service';
import { GetChatsFilterDto } from './dto/get-chats.filter.dto';


@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('chats')
@Controller('public/chats')
@UseGuards(AuthGuard())
export class ChatsController {

    constructor(private readonly chatsService: ChatsService) {}

    @Get('/user/:userId')
    public async getChatByUserId(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number): Promise<ResponseCreator> {
        const gotData = await this.chatsService.findOrCreateChat(user.id, userId);
        return new ResponseCreator("CHAT_GOT", gotData);
    } 

    @Get()
    public async getUserChats(
        @GetUser() user: User,
        @Query(ValidationPipe) getChatsFilterDto: GetChatsFilterDto): Promise<ResponseCreator> {
        const gotData = await this.chatsService.getUserChats(user.id, getChatsFilterDto);
        return new ResponseCreator("CHATS_GOT", gotData);
    }
}
