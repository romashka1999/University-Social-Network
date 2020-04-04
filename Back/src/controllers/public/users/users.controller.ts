import { Controller, Patch, Body, ValidationPipe, UseGuards, Get} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { UsersService } from 'src/modules/users/users.service';
import { UserSetPasswordDto } from 'src/modules/users/dtos/user-set-password.dto';
import { GetUser } from 'src/modules/auth/get-account-data.decorator';
import { User } from 'src/modules/users/user.entity';
import { ResponseCreator } from 'src/shared/response-creator';


@Controller('public/users')
@UseGuards(AuthGuard())
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get('/profile')
    public async getUserProfile(@GetUser() user: User): Promise<ResponseCreator> {
        const gotData = await this.usersService.getUserById(user.id);
        return new ResponseCreator("USER_GOT", gotData);
    }

    @Patch('/password')
    public async updateUserPassword(
        @GetUser() user: User,
        @Body(ValidationPipe) userSetPasswordDto: UserSetPasswordDto ): Promise<ResponseCreator> {
        const updatedData = await this.usersService.setUserPasswordById(user.id, userSetPasswordDto);
        return new ResponseCreator("USER_UPDATED", updatedData);
    }

}