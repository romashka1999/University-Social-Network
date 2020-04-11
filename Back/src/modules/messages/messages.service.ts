import { Injectable, InternalServerErrorException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetMessagesFilterDto } from './dto/get-messages.filter.dto';
import { Ipagination, pagination } from 'src/shared/pagination';
import { SendMessageDto } from './dto/send-message.dto';
import { UsersService } from '../users/users.service';


export interface IMessage {
    fromUserId: number;
    toUserId: number;
    content: string;
    sendDate: Date;
}

@Injectable()
export class MessagesService {
                    
    constructor(
        @InjectModel('Message') private readonly Message: Model<any>,
        private readonly usersService: UsersService) {} 

    public async getUserMessages(loggedUserId: number, userId: number, getMessagesFilterDto: GetMessagesFilterDto): Promise<any> {
        const { page, pageSize } = getMessagesFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        try {
            return await this.Message.find({
                $or: [
                    {fromUserId: loggedUserId, toUserId: userId},
                    {fromUserId: userId, toUserId: loggedUserId},
                ]
            },
                ['fromUserId', 'toUserId', 'content', 'sendDate']
            )
            .skip(offset)
            .limit(limit)
            .sort({sendDate: 'desc'})
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async sendMessageToUser(loggedUserId: number, userId: number, sendMessageDto: SendMessageDto): Promise<any> {
        if(loggedUserId === userId) {
            throw new BadRequestException("YOU_CANT_SENT_MESSAGE_YOURSELF");
        }
        await this.usersService.getUserById(userId);
        try {
            const message = new this.Message({
                fromUserId: loggedUserId,
                toUserId: userId,
                content: sendMessageDto.content
            });
            return await message.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async deleteMessage(loggedUserId: number, messageId: string): Promise<any> {
        const deletedMaxTime = 1; // min;
        try {
            const message = await this.Message.findOne({
                    _id: messageId,
                    fromUserId: loggedUserId
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