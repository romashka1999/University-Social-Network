import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';


import { UserRepository } from './user.repository';
import { UserStatus, User } from './user.entity';
import { GetUsersFilterDto } from '../dtos/getUsersFilter.dto';
import { UserSignInDto } from '../../auth/dtos/userSignIn.dto';
import { UserSignUpDto } from '../../auth/dtos/userSignUp.dto';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    public async getUserById(id: number) {
        try {
            const user = await this.userRepository.findOne(id); 

            if(!user) {
                throw new NotFoundException("NOT_FOUND_USER");
            } 

            return user;
        } catch (error) {
            if(!error.status) {
                throw new InternalServerErrorException(error);
            }
            throw error;
        }
    }
    
    public async getUsers(getUsersFilterDto: GetUsersFilterDto) {
        return this.userRepository.getUsers(getUsersFilterDto);
    }
    

    public signUpUser(userSignUpDto: UserSignUpDto) {
        return this.userRepository.signUp(userSignUpDto);
    }

    public async signInUser(userSignInDto: UserSignInDto) {
        const user = this.userRepository.signIn(userSignInDto);

        if(!user) {
            throw new UnauthorizedException("INVALID_CREDENTIALS");
        }

        const payload = { user };
        const accessToken = await this.jwtService.signAsync(payload);

        return { accessToken }
    }

    public async updateUserStatus(id: number, status: UserStatus): Promise<User> {
        const user = await this.getUserById(id);
        user.status = status;
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteUserById(id: number): Promise<boolean> {
        try {
            const deletedUser = await this.userRepository.delete(id);

            if(!deletedUser.affected) {
                throw new NotFoundException("NOT_FOUND_USER")
            }

            return true;
        } catch (error) {
            if(!error.status) {
                throw new InternalServerErrorException(error);
            }
            throw error;
        }
    }
 
}
