import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { AdminRepository } from "src/modules/admins/repositories/admin.repository";
import { AdminSignInDto } from "src/modules/auth/dtos/adminSignIn.dto";



@Injectable()
export class AdminAuthService {

    constructor(
        @InjectRepository(AdminRepository) private readonly admiRepository: AdminRepository,
        private readonly jwtService: JwtService
    ) {}

        
    public async signIn(adminSignInDto: AdminSignInDto): Promise<{accessToken: string}> {
        const admin = await this.admiRepository.signIn(adminSignInDto);
        
        if(!admin) {
            throw new UnauthorizedException("INVALID_CREDENTIALS");
        }

        const payload = { admin };
        const accessToken: string = await this.jwtService.signAsync(payload);

        return { accessToken }
    }

    public async signUp(adminSignUpDto: AdminSignInDto): Promise<boolean> {
        return this.admiRepository.signUp(adminSignUpDto);
    }
}