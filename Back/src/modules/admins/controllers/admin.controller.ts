import { Controller, Post, Body, ValidationPipe, Get, Query, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminSignInDto } from '../dtos/adminSignIn.dto';
import { GetAdminsFilterDto } from '../dtos/getAdminsFilter.dto';
import { AdminStatusValidationPipe } from '../pipes/adminStatusValidation.pipe';

@Controller('admin')
export class AdminController {
    
    constructor(private readonly adminService: AdminService) {}

    @Post('/signIn')
    signIn(@Body(ValidationPipe) adminSignInDto: AdminSignInDto) {
        return this.adminService.signIn(adminSignInDto);
    }


    @Post('/signUp')
    signUp(@Body(ValidationPipe) adminSignUpDto: AdminSignInDto) {
        return this.adminService.signUp(adminSignUpDto);
    }

    @Get()
    getAdmins(@Query(ValidationPipe) getAdminsFilterDto: GetAdminsFilterDto) {

    }

    @Get('/:id')
    getAdminById(@Param('id', ParseIntPipe) id: number) {

    }


    @Get('/:email')
    getAdminByEmail(@Param('email') email: string) {

    }

    @Patch('/:id/status')
    changeAdminStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', AdminStatusValidationPipe) status: string
    ) {

    }

}
