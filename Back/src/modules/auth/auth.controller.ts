import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { SignInDto } from './dtos/signIn.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signUp')
    signUp(@Body(ValidationPipe) signUpDto: SignInDto): Promise<boolean> {
        return this.authService.signUp(signUpDto);
    }

    @Post('signIn')
    signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{accesToken: string}> {
        return this.authService.signIn(signInDto);
    }

}
