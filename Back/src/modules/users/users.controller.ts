import { Controller, Get, Param, ParseIntPipe, Patch, Body, 
    UsePipes, ValidationPipe, Query } from '@nestjs/common';

import { User } from 'src/modules/users/user.entity';
import { UsersService } from './users.service';
import { UserPasswordValidationPipe } from './pipes/userPasswordValidationPipe';
import { GetUsersFilterDto } from './dtos/getUsersFilter.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}
    @Get()
    @UsePipes(ValidationPipe)
    getUsers(@Query() getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    } 

    @Patch('/:id/password')
    @UsePipes(ValidationPipe)
    updateUserPassword(
        @Param('id', ParseIntPipe) id,
        @Body('password', UserPasswordValidationPipe) password: string ): Promise<User> {
        return this.usersService.updateUserPassword(id, password);
    }

}
