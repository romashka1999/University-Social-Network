import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { UserRepository } from "src/modules/users/repositories/user.repository";
import { UserSignUpDto } from "src/modules/auth/dtos/userSignUp.dto";
import { UserSignInDto } from "src/modules/auth/dtos/userSignIn.dto";



@Injectable()
export class UserAuthService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

        
    public async signIn(userSignInDto: UserSignInDto): Promise<{accessToken: string}> {
        const user = await this.userRepository.signIn(userSignInDto);

        if(!user) {
            throw new UnauthorizedException("INVALID_CREDENTIALS");
        }

        const payload = { user };
        const accessToken: string = await this.jwtService.signAsync(payload);

        return { accessToken }
    }


    public signUp(userSignUpDto: UserSignUpDto): Promise<boolean> {
        return this.userRepository.signUp(userSignUpDto);
    }

}