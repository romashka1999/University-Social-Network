import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserRepository } from '../../users/repositories/user.repository';
import { User } from '../../users/entities/user.entity';
import { AdminRepository } from '../../admins/repositories/admin.repository';
import { Admin } from '../../admins/entities/admin.entity';

import * as config from 'config';
const jwtCFG = config.get('jwt');

@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
            secretOrKey: jwtCFG.secret,
        });
    }

    async validate(payload: any): Promise<User> {
        const { accountIdentity } = payload.user;
        const user = await this.userRepository.getUserByAccountIdentity(accountIdentity);
        if(!user) {
            throw new UnauthorizedException("INVALID_TOKEN");
        }
        return user;
    }
}


@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
            secretOrKey: jwtCFG.secret,
        });
    }

    async validate(payload: any): Promise<Admin> {
        const { email } = payload.admin;
        const admin = await this.adminRepository.findOne({ email });
        if(!admin) {
            throw new UnauthorizedException("INVALID_TOKEN");
        }
        return admin;
    }
}