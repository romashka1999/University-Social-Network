import { Injectable, InternalServerErrorException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Model , connection} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { GetChatsFilterDto } from './dto/get-chats.filter.dto';
import { Ipagination, pagination } from 'src/shared/pagination';
import { UsersService } from '../users/users.service';
import { IChat } from './chat.entity';


@Injectable()
export class ChatsService {
                    
    constructor(
        @InjectModel('Chat') private readonly Chat: Model<IChat>,
        private readonly usersService: UsersService) {} 


    public async getUserChats(userId: number, getChatsFilterDto: GetChatsFilterDto): Promise<any> {
        const { page, pageSize } = getChatsFilterDto;
        const { offset, limit } = <Ipagination>pagination(page, pageSize);
        try {
            let chats = await this.Chat.find({
                            users: { $in: [userId] }  
                        })
                        .select(['users', 'createdAt', 'updatedAt'])
                        .skip(offset)
                        .limit(limit)
                        .sort({createdAt: 'desc'});
            let chatUserIds = [];
            chats.forEach(chat => {
                chatUserIds.push(chat.users);
            });
            function flatten(arr) {
                return arr.reduce(function (flat, toFlatten) {
                  return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
                }, []);
            }
            chatUserIds = flatten(chatUserIds);

            const uniqueChatUserIdsArray = [];
            const uniqueChatUserIds = new Set();

            for(let userId of chatUserIds) {
                let beforeSetSise = uniqueChatUserIds.size;
                uniqueChatUserIds.add(userId);
                if(uniqueChatUserIds.size !== beforeSetSise) {
                    uniqueChatUserIdsArray.push(userId);
                }
            }
            const users = await this.usersService.getUsersByIds(uniqueChatUserIdsArray);
            const memoUserDP = {};
            for(let chat of chats) {
                let usersArray = [];
                for(let chatUserId of chat.users) {
                    if(memoUserDP[chatUserId]) {
                        usersArray.push({
                            firstName: memoUserDP[chatUserId]?.user_firstName,
                            lastname: memoUserDP[chatUserId]?.user_lastName,
                            prifileImgUrl: memoUserDP[chatUserId]?.user_profileImgUrl,
                            userId: chatUserId
                        });
                    } else {
                        const user: any = users.find( (user: any) => user.user_id === chatUserId);
                        memoUserDP[chatUserId] = user;
                        usersArray.push({
                            firstName: memoUserDP[chatUserId]?.user_firstName,
                            lastname: memoUserDP[chatUserId]?.user_lastName,
                            prifileImgUrl: memoUserDP[chatUserId]?.user_profileImgUrl,
                            userId: chatUserId
                        });
                    } 
                }
                chat.users = usersArray;
            }
            return chats;

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
            const chat = await this.Chat.findOne({
                $or: [
                    {users: [loggedUserId, userId]},
                    {users: [userId, loggedUserId]}
                ],
                
            }).select(['users', 'createdAt', 'updatedAt']);

            if(!chat) {
                const chat = new this.Chat({
                    users: [loggedUserId, userId]
                });
                const createdChat = await chat.save();
                delete createdChat.__v;
                return createdChat;
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