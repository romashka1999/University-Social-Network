import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { GetUsersFilterDto } from './dtos/get-users-filter.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserSetPasswordDto } from './dtos/user-set-password.dto';
import { hashPassword } from '../auth/helpers/password';
import { UserSearchDto } from './dtos/user-serach.dto';
import { UserSetEmailDto } from './dtos/user-set-email.dto';
import { UserSetUsernameDto } from './dtos/user-set-username.dto';
import { UserSetPhoneNumberDto } from './dtos/user-set-phoneNumber.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

    public getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        return this.userRepository.getUsers(getUsersFilterDto);
    }

    public async getUserProfileById(loggedUserId: number, userId: number): Promise<User> {
        if(loggedUserId === userId) {
            const user = await this.getUserById(loggedUserId);
            delete user.password;
            delete user.salt;
            delete user.createDate;
            delete user.updateDate;
            return user;
        } else {
            try {
                const user = await this.getUserById(userId);
                delete user.password;
                delete user.salt;
                delete user.createDate;
                delete user.updateDate;
                delete user.status;
                if(!user.publicUser) {
                    delete user.birthDate;
                }
                return user;
            } catch (error) {
                throw new InternalServerErrorException(error);
            }
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

    public async getUserById(id: number): Promise<User> {
        try {
            const user =  await this.userRepository.findOne({ id });
            if(!user) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "USER_NOT_EXISTS"};
            }
            return user;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async setUserPasswordById(id: number, userSetPasswordDto: UserSetPasswordDto): Promise<boolean> {
        const { oldPassword, newPassword } = userSetPasswordDto;
        const user = await this.getUserById(id);

        if(!await user.validatePassword(oldPassword)) {
            throw new BadRequestException("PASSWORD_IS_INCORRECT");
        }
        const { salt, hashedPassword } = await hashPassword(newPassword);
        return await this.userRepository.setUserInfo(id, {password: hashedPassword, salt});
    }

    public async setUserEmailById(id: number, userSetEmailDto: UserSetEmailDto) {
        await this.getUserById(id);
        return await this.userRepository.setUserInfo(id,  userSetEmailDto);
    }

    public async setUserUsernameById(id: number, userSetUsernameDto: UserSetUsernameDto) {
        await this.getUserById(id);
        return await this.userRepository.setUserInfo(id, userSetUsernameDto);
    }

    public async setUserPhoneNumberById(id: number, userSetPhoneNumberDto: UserSetPhoneNumberDto) {
        await this.getUserById(id);
        return await this.userRepository.setUserInfo(id, userSetPhoneNumberDto);
    }

    public async checkUserPublicById(id: number): Promise<boolean> {
        const user = await this.getUserById(id);
        return user.publicUser ? true : false;
    }

    public searchUsers(userSearchDto: UserSearchDto): Promise<Array<User>> {
        return this.userRepository.searchUsers(userSearchDto);
    }       

}
