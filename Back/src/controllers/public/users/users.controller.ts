import { Controller, Patch, Body, ValidationPipe, UseGuards, Get, Query, Param, ParseIntPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { UsersService } from 'src/modules/users/users.service';
import { UserSetPasswordDto } from 'src/modules/users/dtos/user-set-password.dto';
import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/response-creator';
import { UserSearchDto } from 'src/modules/users/dtos/user-serach.dto';
import { FollowersService } from 'src/modules/followers/followers.service';
import { UserSetPhoneNumberDto } from 'src/modules/users/dtos/user-set-phoneNumber.dto';
import { UserSetUsernameDto } from 'src/modules/users/dtos/user-set-username.dto';
import { UserSetEmailDto } from 'src/modules/users/dtos/user-set-email.dto';


@Controller('public/users')
@UseGuards(AuthGuard())
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly followersService: FollowersService) {}

    @Get('/profile/:userId')
    public async getUserProfile(
        @GetUser() user: User,
        @Param('userId', ParseIntPipe) userId: number): Promise<ResponseCreator> {
        const gotData = await this.usersService.getUserProfileById(user.id, userId);
        return new ResponseCreator("USER_GOT", gotData);
    }

    @Patch('/password')
    public async updateUserPassword(
        @GetUser() user: User,
        @Body(ValidationPipe) userSetPasswordDto: UserSetPasswordDto): Promise<ResponseCreator> {
        const updatedData = await this.usersService.setUserPasswordById(user.id, userSetPasswordDto);
        return new ResponseCreator("USER_UPDATED", updatedData);
    }

    @Patch('/phoneNumber')
    public async updateUserPhoneNumber(
        @GetUser() user: User,
        @Body(ValidationPipe) userSetPhoneNumberDto: UserSetPhoneNumberDto): Promise<ResponseCreator> {
        const updatedData = await this.usersService.setUserPhoneNumberById(user.id, userSetPhoneNumberDto);
        return new ResponseCreator("USER_UPDATED", updatedData);
    }

    @Patch('/username')
    public async updateUsername(
        @GetUser() user: User,
        @Body(ValidationPipe) userSetUsernamedDto: UserSetUsernameDto): Promise<ResponseCreator> {
        const updatedData = await this.usersService.setUserUsernameById(user.id, userSetUsernamedDto);
        return new ResponseCreator("USER_UPDATED", updatedData);
    }

    @Patch('/email')
    public async updateEmail(
        @GetUser() user: User,
        @Body(ValidationPipe) userSetEmailDto: UserSetEmailDto): Promise<ResponseCreator> {
        const updatedData = await this.usersService.setUserEmailById(user.id, userSetEmailDto);
        return new ResponseCreator("USER_UPDATED", updatedData);
    }

    @Get('/serachUsers')
    public async searchUsers(@Query(ValidationPipe) userSearchDto: UserSearchDto): Promise<ResponseCreator> {
        const gotData = await this.usersService.searchUsers(userSearchDto);
        return new ResponseCreator("USERS_GOT", gotData);
    }

    @Get('/checkfollowing/:followeeId')
    public async checkfollowing(
        @GetUser() user: User,
        @Param('followeeId', ParseIntPipe) followeeId: number): Promise<ResponseCreator> {
        const gotData = await this.followersService.checkFollowing(user.id, followeeId);
        return new ResponseCreator("FOLLOWING_GOT", gotData);
    }

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
}