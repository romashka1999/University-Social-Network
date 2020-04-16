import { Controller, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/response-creator';
import { PaginationGetFilterDto } from 'src/shared/pagination-get-filter.dto';
import { FollowersService } from './followers.service';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('followers')
@Controller('public/followers')
@UseGuards(AuthGuard())
export class FollowersController {

    constructor(private readonly followersService: FollowersService) {}

    @Get('/followUser/:userId')
    public async followUser(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number): Promise<ResponseCreator> {
        const createdData = await this.followersService.followUser(user.id, userId);
        return new ResponseCreator("FOLLOWING_GOT", createdData);
    }

    @Get('/unfollowUser/:userId')
    public async unfollowUser(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number): Promise<ResponseCreator> {
        const deletedData = await this.followersService.unfollowUser(user.id, userId);
        return new ResponseCreator("FOLLOWING_GOT", deletedData);
    }

    @Get('/userFollowings/:userId')
    public async getUserFollowings(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number,
        @Query(ValidationPipe) paginationGetFilterDto: PaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.followersService.getUserFollowings(user.id, userId, paginationGetFilterDto);
        return new ResponseCreator("FOLLOWINGS_GOT", gotData);
    }

    @Get('/userFollowers/:userId')
    public async getUserFollowers(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number,
        @Query(ValidationPipe) paginationGetFilterDto: PaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.followersService.getUserFollowers(user.id, userId, paginationGetFilterDto);
        return new ResponseCreator("FOLLOWERS_GOT", gotData);
    }

    @Get('/checkFollowing/:userId')
    public async checkFollowing(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number): Promise<ResponseCreator> {
        const gotData = await this.followersService.checkFollowing(user.id, userId);
        return new ResponseCreator("FOLLOWING_GOT", gotData);
    }
}