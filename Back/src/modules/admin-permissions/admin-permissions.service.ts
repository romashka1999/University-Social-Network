import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AdminPermissionRepository } from './admin-permission.repository';
import { PaginationGetFilterDto } from 'src/shared/dtos/pagination-get-filter.dto';
import { Admin } from '../admins/admin.entity';

@Injectable()
export class AdminPermissionsService {

    constructor(@InjectRepository(AdminPermissionRepository) private readonly adminPermissionRepository: AdminPermissionRepository) {
        const insertPermmsions = false;
        if(insertPermmsions) {
            this.adminPermissionRepository.bulkinsertOfAdminPermmissions();
        }
    }

    public async getAdminPermissions(admin: Admin, paginationGetFilterDto: PaginationGetFilterDto): Promise<any> {
        return this.adminPermissionRepository.getAdminPermissions(paginationGetFilterDto);
    }


}
