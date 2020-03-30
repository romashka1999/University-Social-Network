import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../public/users/user.repository';
import { User } from '../../public/users/user.entity';

import * as config from 'config';

const jwtCFG = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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
            throw new UnauthorizedException();
        }

        return user;
    }
}
