import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { UserSignInDto } from './dtos/userSignIn.dto';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dtos/UserSignUp.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signUp')
    signUp(@Body(ValidationPipe) userSignUpDto: UserSignUpDto): Promise<boolean> {
        return this.authService.signUp(userSignUpDto);
    }

    @Post('signIn')
    signIn(@Body(ValidationPipe) userSignInDto: UserSignInDto): Promise<{accesToken: string}> {
        return this.authService.signIn(userSignInDto);
    }

}
