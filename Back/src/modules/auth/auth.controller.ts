import { Controller, Post, Body, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiForbiddenResponse, ApiCreatedResponse } from '@nestjs/swagger';


import { AuthService } from './auth.service';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { AdminSignInDto } from './dtos/admin-sign-in.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ResponseCreator } from 'src/shared/response-creator';
import { imageFileFilter } from 'src/utils/file-uploading.utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('user/signUp')
    @ApiCreatedResponse({ description: 'user signuped successfully'})
    @ApiForbiddenResponse({ description: 'forbidden'})
    @UseInterceptors(FilesInterceptor('profileImg'))
    userSignUp(
        @Body(ValidationPipe) userSignUpDto: UserSignUpDto,
        @UploadedFile() file): Promise<boolean> {
        console.log(file);
        return this.authService.userSignUp(userSignUpDto);
    }

    @Post('test')
    @UseInterceptors(FilesInterceptor('profileImg', 1, {
        fileFilter: imageFileFilter
    }))
    test(@UploadedFile() file) {
        console.log(file);
        return 'uploaded';
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
