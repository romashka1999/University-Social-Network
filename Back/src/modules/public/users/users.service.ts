import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { User } from 'src/modules/public/users/user.entity';
import { GetUsersFilterDto } from './dtos/getUsersFilter.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        return await this.userRepository.getUsers(getUsersFilterDto);
    }

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({id: id})
    }

    async updateUserPassword(id: number, password: string): Promise<User> {
        const user = await this.getUserById(id);
        user.password = password;

        await user.save();

        return user;
    }

    async deleteUserById(id: number): Promise<boolean> {
        try {
            const deletedUser = await this.userRepository.delete(id);

            if(!deletedUser.affected) {
                throw new NotFoundException(`User with id - ${id} does not exist`)
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
