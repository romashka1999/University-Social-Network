import { Controller, Post, Body, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';


import { AuthService } from './auth.service';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { AdminSignInDto } from './dtos/admin-sign-in.dto';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('user/signUp')
    @UseInterceptors(FilesInterceptor('profileImg'))
    userSignUp(
        @Body(ValidationPipe) userSignUpDto: UserSignUpDto,
        @UploadedFiles() file): Promise<boolean> {
        console.log(file);
        return this.authService.userSignUp(userSignUpDto);
    }

    @Post('test')
    @UseInterceptors(FilesInterceptor('profileImg'))
    test(@UploadedFiles() file) {
        console.log(file);
        return 'uploaded';
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