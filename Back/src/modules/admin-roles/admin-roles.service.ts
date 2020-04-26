import { Injectable, InternalServerErrorException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';

import { AdminRoleCreateDto } from './dtos/admin-role-create.dto';
import { AdminRoleUpdateDto } from './dtos/admin-role-update.dto';
import { Admin } from '../admins/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRoleRepository } from './admin-role.repository';
import { AdminRole } from './admin-role.entity';
import { AdminPermissionsService } from '../admin-permissions/admin-permissions.service';
import { DeleteResult } from 'typeorm';

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
            const adminRole = await this.adminRoleRepository.findOne({id: id,}, {relations: ["permissions", "admins"]});
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
        if(admin.adminRoleId === id) {
            throw new BadRequestException('YOU_HAVE_THIS_ADMINROLE');
        }
        try {
            const deletedRole: DeleteResult = await this.adminRoleRepository.delete({id: id});

            if(!deletedRole.affected) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "ADMINROLE_NOT_EXISTS"};
            }

            return deletedRole.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }
}
