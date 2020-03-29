import { Controller, Post, Body, ValidationPipe, Get, Query, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminSignInDto } from '../../auth/dtos/adminSignIn.dto';
import { GetAdminsFilterDto } from '../dtos/getAdminsFilter.dto';
import { AdminStatusValidationPipe } from '../pipes/adminStatusValidation.pipe';

@Controller('admin')
export class AdminController {
    
    constructor(private readonly adminService: AdminService) {}

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
