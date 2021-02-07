import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { UserSignUpDto } from './dtos/user-sign-up.dto';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import { AdminSignInDto } from './dtos/admin-sign-in.dto';
import { AdminRepository } from '../admins/admin.repository';
import { uploadFile } from 'src/shared/utils/uploadfile';
import { AdminRolesService } from '../admin-roles/admin-roles.service';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository,
        private readonly jwtService: JwtService
    ) {}

    public async userSignUp(userSignUpDto: UserSignUpDto, profileImgFile: any): Promise<boolean> {
        let prifileImgaName = null;
        if(profileImgFile) {
            console.log('shemovida', profileImgFile);
            prifileImgaName = await uploadFile(profileImgFile, 'profileImages')
        }
        return this.userRepository.signUp(userSignUpDto, prifileImgaName);
    }

    public async userSignIn(userSignInDto: UserSignInDto): Promise<{accessToken: string}> {
        const user = await this.userRepository.signIn(userSignInDto);

        if(!user) {
            throw new UnauthorizedException('INVALID_CREDENTIALS');
        }

        delete user.password;
        delete user.salt;

        const payload = { user };
        const accessToken: string = await this.jwtService.signAsync(payload);

        // const verify: any = await this.jwtService.verifyAsync(accesToken);
        return { accessToken }
    }

    public async adminSignIn(adminSignInDto: AdminSignInDto): Promise<{accessToken: string}> {
        const admin = await this.adminRepository.signIn(adminSignInDto);
        if(!admin) {
            throw new UnauthorizedException('INVALID_CREDENTIALS');
        }
        const payload = { admin };
        const accessToken: string = await this.jwtService.signAsync(payload);

        // const verify: any = await this.jwtService.verifyAsync(accesToken);
        return { accessToken }
    }

    
}
