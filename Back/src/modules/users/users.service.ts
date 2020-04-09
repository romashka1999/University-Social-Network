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
import { FollowersService } from '../followers/followers.service';
import { Follower } from '../followers/follower.entity';
import { PaginationGetFilterDto } from 'src/shared/pagination-get-filter.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly followersService: FollowersService) {}

    public getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        return this.userRepository.getUsers(getUsersFilterDto);
    }

    public async getUserProfileById(loggedUserId: number, userId: number): Promise<User | any> {
        if(loggedUserId === userId) {
            const user = await this.getUserById(loggedUserId);
            delete user.password;
            delete user.salt;
            delete user.createDate;
            delete user.updateDate;
            return user;
        } else {
            const user = await this.getUserById(userId);
            delete user.password;
            delete user.salt;
            delete user.createDate;
            delete user.updateDate;
            delete user.status;
            if(!user.publicUser) {
                delete user.birthDate;
            }
            const profile: any = user;
            profile.following = await this.followersService.checkFollowing(loggedUserId, userId);
            return user;
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

    public async followCntUpdateOnUsers(followerId: number, followeeId: number, action: string): Promise<void> {
        try {
            if(action === "FOLLOW") {
                await this.userRepository.increment({id: followerId}, 'followingsCount', 1);
                await this.userRepository.increment({id: followeeId}, 'followersCount', 1);
            } else if(action === "UNFOLLOW") {
                await this.userRepository.decrement({id: followerId}, 'followingsCount', 1);
                await this.userRepository.decrement({id: followeeId}, 'followersCount', 1);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    } 

    public followUser(loggedUserId: number, userId: number): Promise<Follower> {
        return this.followersService.followUser(loggedUserId, userId);
    }


    public unfollowUser(loggedUserId: number, userId: number): Promise<Follower> {
        return this.followersService.unfollowUser(loggedUserId, userId);
    }



    public async getUserFollowings(loggedUserId: number, userId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Array<User>> {
        const user = await this.getUserById(userId);
        if(!user.publicUser) {
            const followingExists = await this.followersService.checkFollowing(loggedUserId, userId);
            if(!followingExists) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const followees = await this.followersService.getFolloweesByUserId(user.id, paginationGetFilterDto);
        const followeesArray = followees.map(follow => follow.userId);
        return await this.userRepository.getUsersByIds(followeesArray);
    }


    public async getUserFollowers(loggedUserId: number, userId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Array<User>> {
        const user = await this.getUserById(userId);
        if(!user.publicUser) {
            const followingExists = await this.followersService.checkFollowing(loggedUserId, userId);
            if(!followingExists) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const followers = await this.followersService.getFollowersByUserId(user.id, paginationGetFilterDto);
        const followersArray = followers.map(follow => follow.followerId);
        return await this.userRepository.getUsersByIds(followersArray);
    }

}
