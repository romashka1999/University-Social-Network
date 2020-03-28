import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";

import { AdminService } from "../admins/services/admin.service";
import { AdminSignInDto } from "../admins/dtos/adminSignIn.dto";


@Controller('adminAuth')
export class AdminAuthController {

    constructor(private readonly adminService: AdminService) {}

    @Post('signIn')
    signIn(@Body(ValidationPipe) adminSignInDto: AdminSignInDto) {
        return 'rame';
    }

}