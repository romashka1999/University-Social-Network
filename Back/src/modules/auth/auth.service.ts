import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { AdminSignInDto } from './dtos/admin-sign-in.dto';
import { AdminRepository } from '../admins/admin.repository';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository,
        private readonly jwtService: JwtService
    ) {}

    public userSignUp(userSignUpDto: UserSignUpDto): Promise<boolean> {
        return this.userRepository.signUp(userSignUpDto);
    }

    public async userSignIn(userSignInDto: UserSignInDto): Promise<{accesToken: string}> {
        const user = await this.userRepository.signIn(userSignInDto);

        if(!user) {
            throw new UnauthorizedException('INVALID_CREDENTIALS');
        }

        const payload = { user };
        const accesToken: string = await this.jwtService.signAsync(payload);

        // const verify: any = await this.jwtService.verifyAsync(accesToken);
        return { accesToken }
    }

    public async adminSignIn(adminSignInDto: AdminSignInDto): Promise<{accesToken: string}> {
        const admin = await this.adminRepository.signIn(adminSignInDto);

        if(!admin) {
            throw new UnauthorizedException('INVALID_CREDENTIALS');
        }

        const payload = { admin };
        const accesToken: string = await this.jwtService.signAsync(payload);

        // const verify: any = await this.jwtService.verifyAsync(accesToken);
        return { accesToken }
    }

    
}
