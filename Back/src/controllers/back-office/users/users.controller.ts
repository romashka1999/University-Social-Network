import { Controller, Get, Param, ParseIntPipe, UsePipes,
     ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/user.entity';
import { GetUsersFilterDto } from 'src/modules/users/dtos/get-users-filter.dto';
import { GetAdmin } from 'src/modules/auth/get-account-data.decorator';
import { Admin } from 'src/modules/admins/admin.entity';


@Controller('backOffice/users')
@UseGuards(AuthGuard())
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getUsers(
        @GetAdmin() admin: Admin,
        @Query() getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:id')
    getUserById(
        @GetAdmin() admin: Admin,
        @Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    } 
}
