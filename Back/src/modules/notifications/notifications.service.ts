import { Injectable, InternalServerErrorException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';

import { NotificationRepository } from './notification.repository';
import { NotificationType } from './notification.entity';
import { User } from '../users/user.entity';
import { NotificationsGateway } from 'src/sockets/notifications.gateway';
import { Ipagination, pagination } from 'src/shared/utils/pagination';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { NotificationUpdateDto } from './dtos/notification-update.dto';




@Injectable()
export class NotificationsService {

    constructor(
        @InjectRepository(NotificationRepository) private readonly notificationRepository: NotificationRepository,
        private readonly notificationsGateway: NotificationsGateway) { }

    public async createNotification(notificationCreateDto: { type: NotificationType, content: any, user: User, chatId: string }): Promise<void> {
        const content: string = JSON.stringify(notificationCreateDto.content);
        const notification = {
            type: notificationCreateDto.type,
            content: content,
            user: notificationCreateDto.user
        }
        notificationCreateDto.content = content;
        const createdNotification = await this.notificationRepository.createNotification(notification);

        switch (notificationCreateDto.type) {
            case NotificationType.FOLLOW:
                this.notificationsGateway.makeFollow(notificationCreateDto.user.id, createdNotification);
                break;
            case NotificationType.MESSAGE:
                this.notificationsGateway.messageCreated(notificationCreateDto.chatId, createdNotification);
                break;
            case NotificationType.POST_COMMENT:
                this.notificationsGateway.postCreated(notificationCreateDto.user.id, createdNotification);
                break;
            case NotificationType.POST_COMMENT_REACT:
                this.notificationsGateway.commentReacted(notificationCreateDto.user.id, createdNotification);
                break;
            case NotificationType.POST_COMMENT_REPLY:
                this.notificationsGateway.replyCreated(notificationCreateDto.user.id, createdNotification);
                break;
            case NotificationType.POST_COMMENT_REPLY_REACT:
                this.notificationsGateway.replyReacted(notificationCreateDto.user.id, createdNotification);
                break;
            case NotificationType.POST_LIKE:
                this.notificationsGateway.postReacted(notificationCreateDto.user.id, createdNotification);
                break;
        }
    }

    public async getNotifications(user: User, strictPaginationGetFilterDto: StrictPaginationGetFilterDto) {
        const {offset, limit} = <Ipagination>pagination(strictPaginationGetFilterDto.page, strictPaginationGetFilterDto.pageSize);
        try {
            const notifications = await this.notificationRepository.createQueryBuilder('notification')
                    .where('notification.user = :user', {user: user})
                    .skip(offset)
                    .take(limit)
                    .getMany();
            return notifications;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async updateNotification(loggedUserId: number, notificationId: number, notificationUpdateDto: NotificationUpdateDto): Promise<Notification> {
        try {
            const updatedNotification: UpdateResult = await this.notificationRepository.update({id: notificationId, userId: loggedUserId}, notificationUpdateDto);
            if(!updatedNotification.affected) {
                throw {statusCode: HttpStatus.NOT_FOUND, message: "NOTIFICATION_NOT_EXISTS"};
            }
            return updatedNotification.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

}
