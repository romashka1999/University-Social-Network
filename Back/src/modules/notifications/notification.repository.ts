import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";


import { Notification, NotificationType } from "./notification.entity";
import { User } from "../users/user.entity";


@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

    public async createNotification(notificationCreateDto: {type: NotificationType, content: string, user: User}): Promise<Notification> {
        const { user, content, type } = notificationCreateDto;

        const notification = new Notification();
        notification.user = user;
        notification.content = content;
        notification.type = type

        try {
            const createdNotification = await notification.save();
            return createdNotification;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    
}