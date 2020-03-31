import { Controller, Param, ParseIntPipe, Patch, Body, 
 ValidationPipe } from '@nestjs/common';

import { UsersService } from 'src/modules/users/users.service';
import { UserSetPasswordDto } from 'src/modules/users/dtos/user-set-password.dto';


@Controller('public/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Patch('/:id/password')
    updateUserPassword(
        @Param('id', ParseIntPipe) id,
        @Body(ValidationPipe) userSetPasswordDto: UserSetPasswordDto ): Promise<boolean> {
        return this.usersService.setUserPasswordById(id, userSetPasswordDto);
    }

}