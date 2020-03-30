import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { SignUpDto } from './dtos/signUp.dto';
import { SignInDto } from './dtos/signIn.dto';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    signUp(signUpDto: SignUpDto): Promise<boolean> {
        return this.userRepository.signUp(signUpDto);
    }

    async signIn(signInDto: SignInDto): Promise<{accesToken: string}> {
        const user = await this.userRepository.signIn(signInDto);

        if(!user) {
            throw new UnauthorizedException('invalid credentials');
        }

        const payload = { user };
        const accesToken: string = await this.jwtService.signAsync(payload);

        // const verify: any = await this.jwtService.verifyAsync(accesToken);

        

        return { accesToken }
    }
}
