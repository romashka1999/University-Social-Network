import { Controller, Get, Post, Param, ParseIntPipe, Query, ValidationPipe, Patch, Body, Delete } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { User, UserStatus } from '../entities/user.entity';
import { GetUsersFilterDto } from '../dtos/getUsersFilter.dto';
import { UserStatusValidaionPipe } from '../pipes/userStatusValidation.pipe';


@Controller('user')
export class UsersController {
    constructor(private usersService: UserService) {}

    @Get('/getUserById/:id')
    public getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }


    @Get('/getUsers')
    public getUsers(@Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto) {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Post('/createUser')
    public createUser() {
        
    }

    @Patch('/:id/updateUserStatus') 
    public updateUserStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', UserStatusValidaionPipe) status: UserStatus
    ): Promise<User>{
        return this.usersService.updateUserStatus(id, status);
    }

    @Delete('/:id')
    deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.usersService.deleteUserById(id);
    }

}
