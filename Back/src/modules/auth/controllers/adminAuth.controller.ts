import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";

import { AdminSignInDto } from "../dtos/adminSignIn.dto";
import { AdminAuthService } from "../services/adminAuth.service";


@Controller('adminAuth')
export class AdminAuthController {

    constructor(private readonly adminAuthService: AdminAuthService) {}

    @Post('signIn')
    signIn(@Body(ValidationPipe) adminSignInDto: AdminSignInDto): Promise<{accessToken: string}> {
        return this.adminAuthService.signIn(adminSignInDto);
    }

    @Post('signUp')
    signUp(@Body(ValidationPipe) adminSignUpDto: AdminSignInDto): Promise<boolean> {
        return this.adminAuthService.signUp(adminSignUpDto);
    }

}