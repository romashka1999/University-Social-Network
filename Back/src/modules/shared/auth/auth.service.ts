import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../public/users/user.repository';
import { UserSignUpDto } from './dtos/UserSignUp.dto';
import { UserSignInDto } from './dtos/userSignIn.dto';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    signUp(userSignUpDto: UserSignUpDto): Promise<boolean> {
        return this.userRepository.signUp(userSignUpDto);
    }

    async signIn(userSignInDto: UserSignInDto): Promise<{accesToken: string}> {
        const user = await this.userRepository.signIn(userSignInDto);

        if(!user) {
            throw new UnauthorizedException('invalid credentials');
        }

        const payload = { user };
        const accesToken: string = await this.jwtService.signAsync(payload);

        // const verify: any = await this.jwtService.verifyAsync(accesToken);

        

        return { accesToken }
    }
}
