import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';


import { AuthService } from './auth.service';
import { UserSignInDto } from './dtos/userSignIn.dto';
import { UserSignUpDto } from './dtos/userSignUp.dto';
import { AdminSignInDto } from './dtos/adminSIgnIn.dto';


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
