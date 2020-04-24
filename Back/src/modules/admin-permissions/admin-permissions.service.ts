import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AdminPermissionRepository } from './admin-permission.repository';
import { Admin } from 'typeorm';
import { AdminPermissionCreateDto } from './dtos/admin-permission-create.dto';
import { PaginationGetFilterDto } from 'src/shared/dtos/pagination-get-filter.dto';

@Injectable()
export class AdminPermissionsService {

    constructor(@InjectRepository(AdminPermissionRepository) private readonly adminPermissionRepository: AdminPermissionRepository) {}

    public async getAdminPermissions(admin: Admin, paginationGetFilterDto: PaginationGetFilterDto): Promise<any> {
        return this.adminPermissionRepository.getAdminPermissions(paginationGetFilterDto);
    }


}
