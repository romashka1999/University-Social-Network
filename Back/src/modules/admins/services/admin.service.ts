import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AdminRepository } from '../repositories/admin.repository';
import { AdminSignInDto } from 'src/modules/admins/dtos/adminSignIn.dto';

@Injectable()
export class AdminService {

    constructor(@InjectRepository(AdminRepository) private adminRepository: AdminRepository) {}

    async signIn(adminSignInDto: AdminSignInDto) {

    }

    async signUp(sdminSignUpDto: AdminSignInDto) {
        
    }
    
}
