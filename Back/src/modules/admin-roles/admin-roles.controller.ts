import { Controller, UseGuards, Get, Delete, Put, Post, Query, Param, ParseIntPipe, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';


import { AdminRolesService } from './admin-roles.service';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { GetAdmin } from '../auth/get-account-data.decorator';
import { Admin } from '../admins/admin.entity';
import { AdminRoleCreateDto } from './dtos/admin-role-create.dto';
import { AdminRoleUpdateDto } from './dtos/admin-role-update.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('adminRoles')
@Controller('backOffice/adminRoles')
@UseGuards(AuthGuard())
export class AdminRolesController {

    constructor(private readonly adminRolesService: AdminRolesService) {}

    @Get()
    public async getAdminRoles(@GetAdmin() admin: Admin): Promise<ResponseCreator> {
        const gotData = await this.adminRolesService.getAdminRoles();
        return new ResponseCreator("ADMINROLES_GOT", gotData);
    }

    @Get('/:id')
    public async getAdminRole(
        @GetAdmin() admin: Admin,
        @Param('id', ParseIntPipe) id:number): Promise<ResponseCreator> {
        const gotData = await this.adminRolesService.getAdminRole(id);
        return new ResponseCreator("ADMINROLE_GOT", gotData);
    }

    @Post()
    public async createAdminRole(
        @GetAdmin() admin: Admin,
        @Body(ValidationPipe) adminRoleCreateDto: AdminRoleCreateDto): Promise<ResponseCreator> {
        const createdData = await this.adminRolesService.createAdminRole(admin, adminRoleCreateDto);
        return new ResponseCreator("ADMINROLE_CREATED", createdData);
    }

    @Put('/:id/status')
    public async updateAdminRole(
        @GetAdmin() admin: Admin,
        @Body(ValidationPipe) adminRoleUpdateDto: AdminRoleUpdateDto,
        @Param('id', ParseIntPipe) id:number): Promise<ResponseCreator> {
        const updatedData = await this.adminRolesService.updateAdminRole(admin, id, adminRoleUpdateDto);
        return new ResponseCreator("ADMINROLE_UPDATED", updatedData);
    }

    @Delete('/:id')
    public async deleteAdminRole(
        @GetAdmin() admin: Admin,
        @Param('id', ParseIntPipe) id:number): Promise<ResponseCreator> {
        const deletedData = await this.adminRolesService.deleteAdminRole(admin, id);
        return new ResponseCreator("ADMINROLE_DELETED", deletedData);
    }
}
