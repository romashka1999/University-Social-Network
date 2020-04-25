import { Controller, UseGuards, ValidationPipe, Query, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader } from '@nestjs/swagger';



import { AdminPermissionsService } from './admin-permissions.service';
import { GetAdmin } from '../auth/get-account-data.decorator';
import { ResponseCreator } from 'src/shared/utils/response-creator';
import { PaginationGetFilterDto } from 'src/shared/dtos/pagination-get-filter.dto';
import { Admin } from '../admins/admin.entity';

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
    
}
