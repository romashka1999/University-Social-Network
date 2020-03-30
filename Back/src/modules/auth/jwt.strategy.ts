import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { User } from '../users/user.entity';

import { AdminRepository } from '../admins/admin.repository';
import { Admin } from '../admins/admin.entity';

import * as config from 'config';


const jwtCFG = config.get('jwt');

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            secretOrKey: jwtCFG.secret,
        });
    }

    async validate(payload: any): Promise<User> {
        const { username } = payload.user;
        const user = await this.userRepository.findOne({ username });
        if(!user) {
            throw new UnauthorizedException("INVALID_TOKEN");
        }
        return user;
    }
}


@Injectable()
export class JwtAdmintrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
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
