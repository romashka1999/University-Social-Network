import { Injectable, InternalServerErrorException, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';


import { FollowerRepository } from './follower.repository';
import { PaginationGetFilterDto } from 'src/shared/pagination-get-filter.dto';
import { Follower } from './follower.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class FollowersService {

    constructor(
        @InjectRepository(FollowerRepository) private readonly followerRepository: FollowerRepository,
        private readonly usersService: UsersService) { }

    public getFollowersByUserId(userId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Follower[]> {
        return this.followerRepository.getFollowersByUserId(userId, paginationGetFilterDto);
    }

    public async getFolloweesByUserId(userId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Follower[]> {
        return this.followerRepository.getFolloweesByUserId(userId, paginationGetFilterDto);
    }
    
    public async checkFollowing(followerId: number, followeeId: number): Promise<boolean> {
        try {
            const following = await this.followerRepository.findOne({followerId: followerId, userId: followeeId});
            return following ? true : false;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    public async followUser(followerId: number, followeeId: number): Promise<Follower> {
        if(followerId === followeeId) {
            throw new BadRequestException("FOLLOWERID_MUST_NOT_BE_EQUAL_TO_FOLLOWEEID");
        }
        // check if user followeeId in users tabe
        await this.usersService.getUserById(followeeId);
        try {
            const follwer = new Follower();
            follwer.userId = followeeId;
            follwer.followerId = followerId;
            const createdFollower = await follwer.save();
            await this.usersService.followCntUpdateOnUsers(followerId, followeeId, "FOLLOW");
            return createdFollower;
        } catch (error) {
            if (error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async unfollowUser(followerId: number, followeeId: number): Promise<Follower> {
        try {
            const deletedFollowing: DeleteResult = await this.followerRepository.delete({followerId: followerId, userId: followeeId});
            if(!deletedFollowing.affected) {
                throw { statusCode: HttpStatus.BAD_REQUEST, message: "FOLLOWING_NOT_EXISTS" };
            }
            await this.usersService.followCntUpdateOnUsers(followerId, followeeId, "UNFOLLOW");
            return deletedFollowing.raw;
        } catch (error) {
            if (error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }


    public async getUserFollowings(loggedUserId: number, userId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Array<User>> {
        const user = await this.usersService.getUserById(userId);
        if(!user.publicUser) {
            const followingExists = await this.checkFollowing(loggedUserId, userId);
            if(!followingExists) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const followees = await this.getFolloweesByUserId(user.id, paginationGetFilterDto);
        const followeesArray = followees.map(follow => follow.userId);
        return await this.usersService.getUsersByIds(followeesArray);
    }


    public async getUserFollowers(loggedUserId: number, userId: number, paginationGetFilterDto: PaginationGetFilterDto): Promise<Array<User>> {
        const user = await this.usersService.getUserById(userId);
        if(!user.publicUser) {
            const followingExists = await this.checkFollowing(loggedUserId, userId);
            if(!followingExists) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        const followers = await this.getFollowersByUserId(user.id, paginationGetFilterDto);
        const followersArray = followers.map(follow => follow.followerId);
        return await this.usersService.getUsersByIds(followersArray);
    }
}
