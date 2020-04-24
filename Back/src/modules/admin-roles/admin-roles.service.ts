import { Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';

import { AdminRoleCreateDto } from './dtos/admin-role-create.dto';
import { AdminRoleUpdateDto } from './dtos/admin-role-update.dto';
import { Admin } from '../admins/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRoleRepository } from './admin-role.repository';

@Injectable()
export class AdminRolesService {

    constructor(@InjectRepository(AdminRoleRepository) private readonly adminRoleRepository: AdminRoleRepository) {}
    
    public async getAdminRoles(): Promise<any> {
        try {
            return await this.adminRoleRepository.find();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getAdminRole(id:number): Promise<any> {
        try {
            const admin =  this.adminRoleRepository.findOne({id: id});
            if(!admin) {
                throw { statusCode: HttpStatus.NOT_FOUND, message: "ADMIN_NOT_EXISTS" };
            }
        } catch (error) {
            if (error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async createAdminRole(admin: Admin, adminRoleCreateDto: AdminRoleCreateDto): Promise<any> {
        return this.adminRoleRepository.createAdminRole(adminRoleCreateDto);
    }

    public async updateAdminRole(admin: Admin, id:number, adminRoleUpdateDto: AdminRoleUpdateDto): Promise<any> {

    }

    public async deleteAdminRole(admin: Admin, id:number): Promise<any> {

    }
}
