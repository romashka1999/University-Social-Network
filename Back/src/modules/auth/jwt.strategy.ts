import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { AdminRepository } from '../admins/admin.repository';
import { Admin } from '../admins/admin.entity';
import { User } from '../users/user.entity';

import * as config from 'config';



const jwtCFG = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository,) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            secretOrKey: jwtCFG.secret,
        });
    }

    async validate(payload: any): Promise<{admin: boolean, data: Admin | User}> {
        if(payload.admin) {
            const admin = await this.adminRepository.findOne({where: payload.admin});
            if(!admin) throw new UnauthorizedException("INVALID_TOKEN");
            return {admin: true, data: admin};
        } else if(payload.user) {
            const user = await this.userRepository.findOne({where: payload.user});
            if(!user) throw new UnauthorizedException("INVALID_TOKEN");
            return {admin: false, data: user};
        } else {
            throw new UnauthorizedException("INVALID_TOKEN");
        }
    }
}
