import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { AdminRepository } from '../admins/admin.repository';
import { Admin } from '../admins/admin.entity';
import { User } from '../users/user.entity';

import * as config from 'config';
import { AdminRolesService } from '../admin-roles/admin-roles.service';



const jwtCFG = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository,
        private readonly adminRolesService: AdminRolesService,) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            secretOrKey: jwtCFG.secret,
        });
    }

    async validate(payload: any): Promise<{admin: boolean, data: Admin | User}> {
        console.log('jwt payload:', payload);
        if(payload.admin) {
            const admin = await this.adminRepository.findOne({where: {id: payload.admin.id}});
            if(!admin) throw new UnauthorizedException("INVALID_TOKEN");
            const adminRole = await this.adminRolesService.getAdminRole(admin.adminRoleId);
            delete adminRole.admins;
            admin.adminRole = adminRole;
            return {admin: true, data: admin};
        } else if(payload.user) {
            const user = await this.userRepository.findOne({where: {id: payload.user.id}});
            if(!user) throw new UnauthorizedException("INVALID_TOKEN");
            return {admin: false, data: user};
        } else {
            throw new UnauthorizedException("INVALID_TOKEN");
        }
    }
}
