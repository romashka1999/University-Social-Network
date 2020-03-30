import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';


import { AuthService } from './auth.service';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { AdminSignInDto } from './dtos/admin-sign-in.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('user/signUp')
    userSignUp(@Body(ValidationPipe) userSignUpDto: UserSignUpDto): Promise<boolean> {
        return this.authService.userSignUp(userSignUpDto);
    }

    @Post('user/signIn')
    userSignIn(@Body(ValidationPipe) userSignInDto: UserSignInDto): Promise<{accesToken: string}> {
        return this.authService.userSignIn(userSignInDto);
    }

    @Post('admin/signIn')
    adminSignIn(@Body(ValidationPipe) adminSignInDto: AdminSignInDto): Promise<{accesToken: string}> {
        return this.authService.adminSignIn(adminSignInDto);
    }

}
