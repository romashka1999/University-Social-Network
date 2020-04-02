import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

    public creatAdmin(adminCreateDto: AdminCreateDto): Promise<boolean> {
        return this.adminRepository.createAdmin(adminCreateDto);
    }

    public async setAdminStatusById(id: number, adminSetStatusDto: AdminSetStatusDto): Promise<boolean> {
        try {
            const updatedUser: UpdateResult =  await this.adminRepository
                .createQueryBuilder('translation')
                .update(Admin)
                .set(adminSetStatusDto)
                .where("id = :id", { id: id })
                .execute();
            if(!updatedUser.affected) {
                throw new NotFoundException("ADMIN_NOT_EXISTS");
            }
            return true;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async deleteAdminById(id: number): Promise<boolean> {
        try {
            const deletedAdmin: DeleteResult = await this.adminRepository.delete({id: id});

            if(!deletedAdmin.affected) {
                throw new NotFoundException("ADMIN_NOT_EXISTS");
            }

            return true;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
