import { Controller, Get, Query, ValidationPipe, Post, Patch, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';

import { AdminsService } from 'src/modules/admins/admins.service';
import { GetAdminsFilterDto } from 'src/modules/admins/dtos/get-admins-filter.dto';
import { AdminSetStatusDto } from 'src/modules/admins/dtos/admin-set-status.dto';
import { AdminCreateDto } from 'src/modules/admins/dtos/admin-create.dto';
import { ResponseCreator } from 'src/shared/response-creator';

@Controller('admins')
export class AdminsController {

    constructor(private readonly adminsService: AdminsService) {}

    @Get()
    public async getAdmins(@Query(ValidationPipe) getAdminsFilterDto: GetAdminsFilterDto): Promise<ResponseCreator> {
        const gotData = await this.adminsService.getAdmins(getAdminsFilterDto);
        return new ResponseCreator("ADMINS_GOT", gotData);
    }

    @Post()
    public async createAdmin(@Body(ValidationPipe) adminCreateDto: AdminCreateDto): Promise<ResponseCreator> {
        const createdData = await this.adminsService.creatAdmin(adminCreateDto);
        return new ResponseCreator("ADMIN_CREATED", createdData);
    }

    @Patch('/:id/status')
    public async setAdminStatusById(
        @Body(ValidationPipe) adminSetStatusDto: AdminSetStatusDto,
        @Param('id', ParseIntPipe) id:number): Promise<ResponseCreator> {
        const updatedData = await this.adminsService.setAdminStatusById(id, adminSetStatusDto);
        return new ResponseCreator("ADMIN_UPDATED", updatedData);
    }

    @Delete('/:id')
    public async deleteAdminById(@Param('id', ParseIntPipe) id:number): Promise<ResponseCreator> {
        const deletedData = await this.adminsService.deleteAdminById(id);
        return new ResponseCreator("ADMIN_DELETED", deletedData);
    }
}
