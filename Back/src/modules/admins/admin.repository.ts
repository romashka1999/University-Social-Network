import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException, ConflictException } from "@nestjs/common";

import { Admin } from "./admin.entity";
import { AdminSignInDto } from "../auth/dtos/admin-sign-in.dto";
import { AdminCreateDto } from "./dtos/admin-create.dto";
import { hashPassword } from "../auth/helpers/password";
import { GetAdminsFilterDto } from "./dtos/get-admins-filter.dto";
import { Ipagination, pagination } from "src/shared/pagination";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {

    public async getAdmins(getAdminsFilterDto: GetAdminsFilterDto) : Promise<Array<Admin>>{
        const { page, pageSize, email } = getAdminsFilterDto;

        const query = this.createQueryBuilder('admin');

        if(email) {
            query.andWhere(`admin.email LIKE :email`, {email: email});
        }

        if(page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        try {
            const admins = await query.getMany();
            return admins;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    public async signIn(adminSignInDto: AdminSignInDto): Promise<Admin> | null {
        const { email, password } = adminSignInDto;

        try {
            const admin = await this.findOne({email});

            if(admin && await admin.validatePassword(password)) {
                if(!admin || admin.password !== password) {
                    return admin;
                } else {
                    return null;
                }
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async createAdmin(adminCreateDto: AdminCreateDto): Promise<Admin> {
        const { email, password } = adminCreateDto;

        const { salt, hashedPassword } = await hashPassword(password);// hash pass
        const admin =  new Admin();
        admin.email = email;
        admin.password = hashedPassword;
        admin.salt = salt;

        try {
            const createdAdmin = await admin.save();
            return createdAdmin;
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException("EMAIL_ALREADY_EXISTS");
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }
}