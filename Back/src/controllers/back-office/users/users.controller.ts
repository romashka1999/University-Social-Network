import { Controller, Get, Param, ParseIntPipe, UsePipes,
     ValidationPipe, Query } from '@nestjs/common';

import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/user.entity';
import { GetUsersFilterDto } from 'src/modules/users/dtos/get-users-filter.dto';

@Controller('backOffice/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getUsers(@Query() getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    } 
}
