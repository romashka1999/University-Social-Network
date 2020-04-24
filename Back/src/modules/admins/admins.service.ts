import { Injectable, NotFoundException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AdminRepository } from './admin.repository';
import { AdminCreateDto } from './dtos/admin-create.dto';
import { GetAdminsFilterDto } from './dtos/get-admins-filter.dto';
import { Admin } from './admin.entity';
import { AdminSetStatusDto } from './dtos/admin-set-status.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class AdminsService {

    constructor(@InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository) {}

    public getAdmins(getAdminsFilterDto: GetAdminsFilterDto): Promise<Array<Admin>> {
        return this.adminRepository.getAdmins(getAdminsFilterDto);
    }

    public async getAdmin(id: number) {
        return await this.adminRepository.findOne({id: id});
    }

    public creatAdmin(adminCreateDto: AdminCreateDto): Promise<Admin> {
        return this.adminRepository.createAdmin(adminCreateDto);
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

    public async deleteAdminById(id: number): Promise<Admin> {
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
