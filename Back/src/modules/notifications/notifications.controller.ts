import { Controller, UseGuards, Get, Query, ValidationPipe, Post, Body, ParseIntPipe, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { NotificationsService } from './notifications.service';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { NotificationUpdateDto } from './dtos/notification-update.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('notifications')
@Controller('public/notifications')
@UseGuards(AuthGuard())
export class NotificationsController {

    constructor(private readonly notificationsService: NotificationsService) {}

    @Get() 
    public async getNotifications(
        @GetUser() user: User,
        @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.notificationsService.getNotifications(user, strictPaginationGetFilterDto)
        return new ResponseCreator("NOTIFICATIONS_GOT", gotData);
    }

    @Put('/:id')
    public async updatePostByPostId(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) notificationId: number,
        @Body(ValidationPipe) notificationUpdateDto: NotificationUpdateDto): Promise<ResponseCreator> {
        const updatedData = await this.notificationsService.updateNotification(user.id, notificationId, notificationUpdateDto)
        return new ResponseCreator("NOTIFICATION_UPDATED", updatedData);
    }

}
