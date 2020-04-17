import { Controller, Post, Body, ValidationPipe, Req } from '@nestjs/common';
import { ApiTags, ApiForbiddenResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Request } from 'express';


import { AuthService } from './auth.service';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { AdminSignInDto } from './dtos/admin-sign-in.dto';
import { ResponseCreator } from 'src/shared/utils/response-creator';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('user/signUp')
    @ApiCreatedResponse({ description: 'user signuped successfully'})
    @ApiForbiddenResponse({ description: 'forbidden'})
    userSignUp(
        @Req() req: any,
        @Body(ValidationPipe) userSignUpDto: UserSignUpDto): Promise<boolean> {
        return this.authService.userSignUp(userSignUpDto, req.files.profileImg);
    }

    @Post('user/signIn')
    userSignIn(@Body(ValidationPipe) userSignInDto: UserSignInDto): Promise<{accessToken: string}> {
        return this.authService.userSignIn(userSignInDto);
    }

    @Post('admin/signIn')
    public async adminSignIn(@Body(ValidationPipe) adminSignInDto: AdminSignInDto): Promise<ResponseCreator> {
        const signedInData = await this.authService.adminSignIn(adminSignInDto);
        return new ResponseCreator("ADMIN_SIGNED_IN", signedInData);
    }

}
