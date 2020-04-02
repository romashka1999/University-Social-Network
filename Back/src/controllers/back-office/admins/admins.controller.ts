import { Controller, Get, Query, ValidationPipe, Post, Patch, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';

import { AdminsService } from 'src/modules/admins/admins.service';
import { GetAdminsFilterDto } from 'src/modules/admins/dtos/get-admins-filter.dto';
import { Admin } from 'src/modules/admins/admin.entity';
import { AdminSetStatusDto } from 'src/modules/admins/dtos/admin-set-status.dto';
import { AdminCreateDto } from 'src/modules/admins/dtos/admin-create.dto';

@Controller('admins')
export class AdminsController {

    constructor(private readonly adminsService: AdminsService) {}

    @Get()
    public getAdmins(@Query(ValidationPipe) getAdminsFilterDto: GetAdminsFilterDto): Promise<Array<Admin>> {
        return this.adminsService.getAdmins(getAdminsFilterDto);
    }

    @Post()
    public createAdmin(@Body(ValidationPipe) adminCreateDto: AdminCreateDto): Promise<boolean> {
        return this.adminsService.creatAdmin(adminCreateDto);
    }

    @Patch('/:id/status')
    public setAdminStatusById(
        @Body(ValidationPipe) adminSetStatusDto: AdminSetStatusDto,
        @Param('id', ParseIntPipe) id:number): Promise<boolean> {
        return this.adminsService.setAdminStatusById(id, adminSetStatusDto);
    }

    @Delete('/:id')
    public deleteAdminById(@Param('id', ParseIntPipe) id:number): Promise<boolean> {
        return this.adminsService.deleteAdminById(id);
    }
}
