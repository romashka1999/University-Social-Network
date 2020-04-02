import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';


import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { GetUsersFilterDto } from './dtos/get-users-filter.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserSetPasswordDto } from './dtos/user-set-password.dto';
import { hashPassword } from '../auth/helpers/password';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

    public getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        return this.userRepository.getUsers(getUsersFilterDto);
    }

    public async getUserById(id: number): Promise<User> {
        try {
            return await this.userRepository.findOne({ id })
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    public async deleteUserById(id: number): Promise<boolean> {
        try {
            const deletedUser = await this.userRepository.delete(id);

            if(!deletedUser.affected) {
                throw new NotFoundException("USER_NOT_EXISTS");
            }

            return true;
        } catch (error) {
            if(!error.status) {
                throw new InternalServerErrorException(error);
            }
            throw error;
        }
    }

    public updateUserById(id: number, userUpdateDto: UserUpdateDto): Promise<boolean> {
        return this.userRepository.setUserInfo(id, userUpdateDto);
    }

    public async setUserPasswordById(id: number, userSetPasswordDto: UserSetPasswordDto): Promise<boolean> {
        const { oldPassword, newPassword } = userSetPasswordDto;
        const user = await this.getUserById(id);
        if(!user) {
            throw new NotFoundException("USER_NOT_EXISTS");
        }
        const { password } = user;
        if(oldPassword !== password) {
            throw new BadRequestException("PASSWORD_IS_INCORRECT");
        }
        const { salt, hashedPassword } = await hashPassword(newPassword);
        return this.userRepository.setUserInfo(id, {password: hashedPassword, salt});
    }

    public async setUserEmailById(id: number, email: string) {
        const user = await this.getUserById(id);
        if(!user) {
            throw new NotFoundException("USER_NOT_EXISTS");
        }
        return this.userRepository.setUserInfo(id,  { email });
    }

    public async setUserUsernameById(id: number, username: string) {
        const user = await this.getUserById(id);
        if(!user) {
            throw new NotFoundException("USER_NOT_EXISTS");
        }
        return this.userRepository.setUserInfo(id, { username });
    }

    public async setUserPhoneNumberById(id: number, phoneNumber: string) {
        const user = await this.getUserById(id);
        if(!user) {
            throw new NotFoundException("USER_NOT_EXISTS");
        }
        return this.userRepository.setUserInfo(id, { phoneNumber });
    }

}
