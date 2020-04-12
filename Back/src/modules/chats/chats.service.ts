import { Injectable, InternalServerErrorException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { GetChatsFilterDto } from './dto/get-chats.filter.dto';
import { Ipagination, pagination } from 'src/shared/pagination';
import { UsersService } from '../users/users.service';


export interface IChat {
    users: any[];
    createdAt: Date;
}

@Injectable()
export class ChatsService {
                    
    constructor(
        @InjectModel('Chat') private readonly Chat: Model<any>,
        private readonly usersService: UsersService) {} 


    public async getUserChats(userId: number, getChatsFilterDto: GetChatsFilterDto): Promise<any> {
        const { page, pageSize } = getChatsFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        try {
            return await this.Chat.find({
                            users: { $in: [userId] }  
                        },
                            ['users', 'createdAt']
                        )
                        .skip(offset)
                        .limit(limit)
                        .sort({createdAt: 'desc'})
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async findOrCreateChat(loggedUserId: number, userId: number ): Promise<any> {
        if(loggedUserId === userId) {
            throw new BadRequestException("YOU_CANT_SENT_MESSAGE_YOURSELF");
        }
        await this.usersService.getUserById(userId);
        try {
            const chat = await this.Chat.find({
                users: { $in: [loggedUserId, userId] }
            });

            if(!chat) {
                const chat = new this.Chat({
                    users: [loggedUserId, userId]
                });
                return await chat.save();
            } else {
                return chat;
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getChatById(chatId: string): Promise<any> {
        try {
            const chat = await this.Chat.findById(chatId);
            if(!chat) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "CHAT_NOT_EXISTS"};
            }
            return chat;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }
}