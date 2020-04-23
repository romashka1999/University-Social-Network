import { Controller, UseGuards, Body, Post, ValidationPipe, Query, Get, Delete, ParseIntPipe, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';



import { AdminPermissionsService } from './admin-permissions.service';
import { GetAdmin } from '../auth/get-account-data.decorator';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { Admin } from 'typeorm';
import { PaginationGetFilterDto } from 'src/shared/dtos/pagination-get-filter.dto';
import { AdminPermissionCreateDto } from './dtos/admin-permission-create.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('adminPermissions')
@Controller('backOffice/adminPermissions')
@UseGuards(AuthGuard())
export class AdminPermissionsController {

    constructor(private readonly adminPermissionsService: AdminPermissionsService) {}


    @Get()
    public async getAdminPermissions(
        @GetAdmin() admin: Admin,
        @Query(ValidationPipe) paginationGetFilterDto: PaginationGetFilterDto): Promise<ResponseCreator> {
        const gotData = await this.adminPermissionsService.getAdminPermissions(admin, paginationGetFilterDto);
        return new ResponseCreator("ADMINPERMISSIONS_GOT", gotData);
    }

    @Post()
    public async createAdminPermission(
        @GetAdmin() admin: Admin,
        @Body(ValidationPipe) adminPermissionCreateDto: AdminPermissionCreateDto): Promise<ResponseCreator> {
        const createdData = await this.adminPermissionsService.createAdminPermission(admin, adminPermissionCreateDto);
        return new ResponseCreator("ADMINPERMISSION_CREATED", createdData);
    }

    @Delete('/:id')
    public async deleteAdminPermission(
        @GetAdmin() admin: Admin,
        @Param('id', ParseIntPipe) adminPermissionId: number): Promise<ResponseCreator> {
        const deletedData = await this.adminPermissionsService.deleteAdminPermission(admin, adminPermissionId);
        return new ResponseCreator("ADMINPERMISSION_DELETED", deletedData);
    }
    
}
