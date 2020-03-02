import { Controller, Post, Body,ValidationPipe } from '@nestjs/common';

import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signUp')
    public signUpUser(@Body(ValidationPipe) signUpUserDto: SignUpUserDto ) {
        return this.authService.signUpUser(signUpUserDto);
    }

    @Post('/signIn')
    public signInUser(@Body(ValidationPipe) signInUserDto: SignInUserDto) {
        return this.authService.signInUser(signInUserDto);
    }
}
