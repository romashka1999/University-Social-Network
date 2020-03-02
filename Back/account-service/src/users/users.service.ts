import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Status, User } from './user.entity';
import { GetUsersFilterDto } from './dto/getUsersFilter.dto';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    public async getUserById(id: number) {
        try {
            const user = await this.userRepository.findOne(id); 

            if(!user) {
                throw new NotFoundException(`user with id - ${id} does not exist`);
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
    

    public signUpUser(signUpUserDto: SignUpUserDto) {
        return this.userRepository.signUp(signUpUserDto);
    }

    public signInUser(signInUserDto: SignInUserDto) {
        return this.userRepository.signIn(signInUserDto);
    }

    public async updateUserStatus(id: number, status: Status): Promise<User> {
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
                throw new NotFoundException(`user with id - ${id} does not exist`)
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
