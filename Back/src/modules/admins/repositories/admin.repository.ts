import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import { Admin } from "../entities/admin.entity";
import { AdminSignInDto } from "src/modules/admins/dtos/adminSignIn.dto";
import { hashPassword } from "src/shared/password";
import { Ipagination, pagination } from "src/shared/pagination";



@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {

    async signUp(adminSignUpDto: AdminSignInDto): Promise<boolean> {
        const { email, password } = adminSignUpDto;

        const { salt, hashedPassword } = await hashPassword(password);
        const admin = new Admin();
        admin.email = email;
        admin.password = hashedPassword;
        admin.salt = salt;

        try {
            await admin.save();
        } catch (error) {
            if(error.code === '23505') {//duplicate email 
                throw new ConflictException('EMAIL_UNIQUE');
            } else {
                throw new InternalServerErrorException(error);
            }
        }

        return true;
    }

    async signIn(adminSignInDto: AdminSignInDto): Promise<Admin> | null {
        const { email, password } = adminSignInDto;

        try {
            const admin = await this.findOne({email: email});

            if(admin && await admin.validatePassword(password)) {
                if(!admin || admin.password !== password) {
                    return null;
                } else {
                    return admin;
                }
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getUsers(getAdminsFilterDto: any): Promise<Array<Admin>> {
        const { status, email ,order, page, pageSize } = getAdminsFilterDto;
        const query = this.createQueryBuilder('user');

        if(order === 'ASC') {
            query.addOrderBy('ASC'); //ordering ascending
        } else if(order === 'DESC') {
            query.addOrderBy('DESC') //ordering descending
        }

        if(page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        if(status) { 
            query.andWhere('admin.status = :status', {status: status}) //search by status
        }

        if(email) {
            query.andWhere('(user.firstname LIKE :email OR user.lastname LIKE :email)', {email: `%${email}%`})
        } 

        try {
            const users = await query.getMany();
            return users;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    }
}