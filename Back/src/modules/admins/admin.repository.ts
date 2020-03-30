import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";

import { Admin } from "./admin.entity";
import { AdminSignInDto } from "../auth/dtos/admin-sign-in.dto";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
    
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
}