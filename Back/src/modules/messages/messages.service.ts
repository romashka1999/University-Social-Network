import { Injectable, InternalServerErrorException, HttpException, HttpStatus, BadGatewayException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { GetMessagesFilterDto } from './dto/get-messages.filter.dto';
import { Ipagination, pagination } from 'src/shared/pagination';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatsService } from '../chats/chats.service';
import { IMessage } from './message.entity';
import { ChatsGateway } from 'src/chat.gateway';


@Injectable()
export class MessagesService {
                    
    constructor(
        @InjectModel('Message') private readonly Message: Model<IMessage>,
        private readonly chatsService: ChatsService,
        private readonly chatsGateway: ChatsGateway) {} 

    public async getChatMessages(loggedUserId: number, chatId: string, getMessagesFilterDto: GetMessagesFilterDto): Promise<any> {
        const { page, pageSize } = getMessagesFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        const chat = await this.chatsService.getChatById(chatId);
        if(!chat.users.find( userId => userId === loggedUserId)) {
            throw new BadGatewayException("YOU_ARE_NOT_CHAT_MEMBER");
        }
        try {
            return await this.Message.find({ 
                chatId: chatId, 
            },
                ['chatId', 'userId', 'content', 'imageUrl', 'createdAt']
            )
            .skip(offset)
            .limit(limit)
            .sort({createdAt: 'desc'})
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async sendMessageToChat(loggedUserId: number, chatId: string, sendMessageDto: SendMessageDto): Promise<any> {
        await this.chatsService.getChatById(chatId);
        try {
            const message = new this.Message({
                chatId: chatId,
                userId: loggedUserId,
                content: sendMessageDto.content
            });
            const createdMessage = await message.save();
            this.chatsGateway.wss.to(`${chatId}chats`).emit('messageCreated', createdMessage);
            return createdMessage;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async deleteMessageFromChat(loggedUserId: number, messageId: string): Promise<any> {
        const deletedMaxTime = 1; // min;
        try {
            const message = await this.Message.findOne({
                    _id: messageId,
                    userId: loggedUserId
            });
            if(!message) {
                throw { statusCode: HttpStatus.BAD_REQUEST, message: "MESSAGE_NOT_EXISTS" };
            } else {
                let limit: Date = new Date();
                limit.setMinutes(limit.getMinutes() + deletedMaxTime);
                console.log(Number(limit), 'limit');
                console.log(Number(message.createdAt), 'sendeDate');
                if(Number(message.createdAt) > Number(limit)) {
                    throw { statusCode: HttpStatus.BAD_REQUEST, message: "DELETE_MESSAGE_IS_TIME_LIMITED" };
                }
                return await this.Message.findByIdAndDelete(messageId);
            }
        } catch (error) {
            if (error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

}