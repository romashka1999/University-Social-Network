import { Injectable, NotFoundException, InternalServerErrorException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AdminRepository } from './admin.repository';
import { AdminCreateDto } from './dtos/admin-create.dto';
import { GetAdminsFilterDto } from './dtos/get-admins-filter.dto';
import { Admin } from './admin.entity';
import { AdminSetStatusDto } from './dtos/admin-set-status.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AdminRolesService } from '../admin-roles/admin-roles.service';

@Injectable()
export class AdminsService {

    constructor(
        @InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository,
        private readonly adminRolesService: AdminRolesService) {}

    public getAdmins(getAdminsFilterDto: GetAdminsFilterDto): Promise<Array<Admin>> {
        return this.adminRepository.getAdmins(getAdminsFilterDto);
    }

    public async getAdmin(id: number): Promise<Admin> {
        try {
            const admin =  await this.adminRepository.findOne({id: id});
            if(!admin) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "ADMIN_NOT_EXISTS"};
            }
            return admin;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async creatAdmin(adminCreateDto: AdminCreateDto): Promise<Admin> {
        const { adminRoleId } = adminCreateDto;
        const adminrole = await this.adminRolesService.getAdminRole(adminRoleId);
        return this.adminRepository.createAdmin(adminCreateDto, adminrole);
    }

    public async setAdminStatusById(id: number, adminSetStatusDto: AdminSetStatusDto): Promise<Admin> {
        try {
            const updatedUser: UpdateResult =  await this.adminRepository
                .createQueryBuilder('translation')
                .update(Admin)
                .set(adminSetStatusDto)
                .where("id = :id", { id: id })
                .execute();
            if(!updatedUser.affected) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "ADMIN_NOT_EXISTS"};
            }
            return updatedUser.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async deleteAdminById(loggedUserId: number, id: number): Promise<Admin> {
        if(loggedUserId === id) {
            throw new BadRequestException("YOU_CANT_DELETE_YOURSELF");
        }
        try {
            const deletedAdmin: DeleteResult = await this.adminRepository.delete({id: id});

            if(!deletedAdmin.affected) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "ADMIN_NOT_EXISTS"};
            }

            return deletedAdmin.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }
}
