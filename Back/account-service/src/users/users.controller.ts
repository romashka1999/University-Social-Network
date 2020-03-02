import { Controller, Get, Post, Param, ParseIntPipe, Query, ValidationPipe, Patch, Body, Delete } from '@nestjs/common';

import { UsersService } from './users.service';
import { User, Status } from './user.entity';
import { GetUsersFilterDto } from './dto/getUsersFilter.dto';
import { UserStatusValidaionPipe } from './pipes/userStatusValidation.pipe';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

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
        @Body('status', UserStatusValidaionPipe) status: Status
    ): Promise<User>{
        return this.usersService.updateUserStatus(id, status);
    }

    @Delete('/:id')
    deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.usersService.deleteUserById(id);
    }

}
