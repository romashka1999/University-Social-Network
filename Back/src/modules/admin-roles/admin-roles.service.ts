import { Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';

import { AdminRoleCreateDto } from './dtos/admin-role-create.dto';
import { AdminRoleUpdateDto } from './dtos/admin-role-update.dto';
import { Admin } from '../admins/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRoleRepository } from './admin-role.repository';
import { AdminRole } from './admin-role.entity';
import { AdminPermissionsService } from '../admin-permissions/admin-permissions.service';

@Injectable()
export class AdminRolesService {

    constructor(
        @InjectRepository(AdminRoleRepository) private readonly adminRoleRepository: AdminRoleRepository,
        private readonly adminPermissionsService: AdminPermissionsService) {}
    
    public async getAdminRoles(): Promise<Array<AdminRole>> {
        try {
            return await this.adminRoleRepository.find({ relations: ["permissions", "admins"]});
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getAdminRole(id:number): Promise<AdminRole> {
        try {
            const adminRole =  this.adminRoleRepository.findOne({id: id,}, {relations: ["permissions", "admins"]});
            if(!adminRole) {
                throw { statusCode: HttpStatus.NOT_FOUND, message: "ADMINROLE_NOT_EXISTS" };
            }
            return adminRole;
        } catch (error) {
            if (error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async createAdminRole(admin: Admin, adminRoleCreateDto: AdminRoleCreateDto): Promise<AdminRole> {
        return this.adminRoleRepository.createAdminRole(adminRoleCreateDto);
    }

    public async updateAdminRole(admin: Admin, id:number, adminRoleUpdateDto: AdminRoleUpdateDto): Promise<any> {
        const { permissionRoleIds } = adminRoleUpdateDto;
        const adminAllPermissions =  await this.adminPermissionsService.getAdminPermissions(admin, {page: null, pageSize: null});
        const currentAdminPermissions = adminAllPermissions.filter((adminPermission) => {
            return permissionRoleIds.find((id) => id === adminPermission.id)
        });
        const adminRole = await this.getAdminRole(id);
        adminRole.permissions = currentAdminPermissions;
        try {
            const updatedAdminRole = await adminRole.save();
            return updatedAdminRole;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async deleteAdminRole(admin: Admin, id:number): Promise<any> {

    }
}
