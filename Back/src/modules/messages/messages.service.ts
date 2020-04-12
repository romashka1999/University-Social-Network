import { Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetMessagesFilterDto } from './dto/get-messages.filter.dto';
import { Ipagination, pagination } from 'src/shared/pagination';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatsService } from '../chats/chats.service';


export interface IMessage {
    chatId: string;
    userId: number;
    content: string;
    sendDate: Date;
}

@Injectable()
export class MessagesService {
                    
    constructor(
        @InjectModel('Message') private readonly Message: Model<any>,
        private readonly chatsService: ChatsService) {} 

    public async getChatMessages(loggedUserId: number, chatId: string, getMessagesFilterDto: GetMessagesFilterDto): Promise<any> {
        const { page, pageSize } = getMessagesFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        const chat = await this.chatsService.getChatById(chatId);
        const users = chat.users;
        try {
            return await this.Message.find({
                where: {
                    chatId: chatId,
                    $or: [
                        {userId: users[0]},
                        {userId: users[1]}
                    ]
                }
            },
                ['chatId', 'userId', 'content', 'sendDate']
            )
            .skip(offset)
            .limit(limit)
            .sort({sendDate: 'desc'})
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
            return await message.save();
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
                console.log(Number(message.sendDate), 'sendeDate');
                if(Number(message.sendDate) > Number(limit)) {
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