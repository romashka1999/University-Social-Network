import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";

import { UserSignInDto } from "../dtos/userSignIn.dto";
import { UserSignUpDto } from "../dtos/userSignUp.dto";
import { UserAuthService } from "../services/userAuth.service";

@Controller('userAuth')
export class UserAuthController {

    constructor(private readonly userAuthService: UserAuthService) {}

    @Post('/signIn')
    signIn(@Body(ValidationPipe) userSignInDto: UserSignInDto): Promise<{accesToken: string}> {
        this.userAuthService.signIn(userSignInDto);
    }

    @Post('/signUp')
    signUp(@Body(ValidationPipe) userSignUpDto: UserSignUpDto): Promise<boolean> {
        this.userAuthService.signUp(userSignUpDto);
    }
}