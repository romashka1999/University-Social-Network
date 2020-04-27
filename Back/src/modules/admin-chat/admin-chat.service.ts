import { Injectable, InternalServerErrorException, HttpException, HttpStatus, BadGatewayException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAdminCHat } from './admin-chat.entity';
import { AdminChatGateway } from 'src/sockets/admin-chat.gateway';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { Ipagination, pagination } from 'src/shared/utils/pagination';
import { SendMessageDto } from '../messages/dto/send-message.dto';
import { Admin } from '../admins/admin.entity';



@Injectable()
export class AdminChatService {
                    
    constructor(
        @InjectModel('AdminChat') private readonly AdminChat: Model<IAdminCHat>,
        private readonly adminChatGateway: AdminChatGateway) {} 

    public async getChatMessages(loggedUserId: number, getMessagesFilterDto: StrictPaginationGetFilterDto): Promise<any> {
        const { page, pageSize } = getMessagesFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        try {
            return await this.AdminChat.find({},
                ['userId', 'content', 'createdAt']
            )
            .skip(offset)
            .limit(limit)
            .sort({createdAt: 'desc'})
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async sendMessageToChat(admin: Admin, sendMessageDto: SendMessageDto): Promise<any> {
        try {
            const adminChatMessage = new this.AdminChat({
                userId: admin.id,
                content: sendMessageDto.content
            });
            const createdAdminChatMessage = await adminChatMessage.save();
            this.adminChatGateway.messageSentToClient(Object.assign(createdAdminChatMessage, {email: admin.email}));
            return createdAdminChatMessage;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // public async deleteMessageFromChat(loggedUserId: number, messageId: string): Promise<any> {
    //     const deletedMaxTime = 1; // min;
    //     try {
    //         const message = await this.Message.findOne({
    //                 _id: messageId,
    //                 userId: loggedUserId
    //         });
    //         if(!message) {
    //             throw { statusCode: HttpStatus.BAD_REQUEST, message: "MESSAGE_NOT_EXISTS" };
    //         } else {
    //             let limit: Date = new Date();
    //             limit.setMinutes(limit.getMinutes() + deletedMaxTime);
    //             console.log(Number(limit), 'limit');
    //             console.log(Number(message.createdAt), 'sendeDate');
    //             if(Number(message.createdAt) > Number(limit)) {
    //                 throw { statusCode: HttpStatus.BAD_REQUEST, message: "DELETE_MESSAGE_IS_TIME_LIMITED" };
    //             }
    //             return await this.Message.findByIdAndDelete(messageId);
    //         }
    //     } catch (error) {
    //         if (error.statusCode) {
    //             throw new HttpException(error.message, error.statusCode);
    //         } else {
    //             throw new InternalServerErrorException(error);
    //         }
    //     }
    // }

}