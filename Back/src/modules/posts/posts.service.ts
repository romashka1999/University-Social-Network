import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { PostRepository } from './post.repository';
import { PostCreateDto } from './dtos/post-create.dto';
import { User } from '../users/user.entity';
import { Post } from './post.entity';
import { PostUpdateDto } from './dtos/post-update.dto';
import { GetUserPostsFilterDto } from './dtos/get-user-posts-filter.dto';
import { pagination, Ipagination } from 'src/shared/pagination';
import { UsersService } from '../users/users.service';
import { FollowersService } from '../followers/followers.service';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
        private readonly usersService: UsersService,
        private readonly followersService: FollowersService) {}

    public async getFolloweesPostsForLoggedUser(user: User, getUserPostsFilterDto: GetUserPostsFilterDto) {
        const followees = await this.followersService.getFolloweesByUserId(user.id);
        const followeesArray = followees.map(follow => follow.userId);
        return this.postRepository.getPostsByUserIds(followeesArray, getUserPostsFilterDto);
    }

    public async getPostsByLoggedUserId(user: User, getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        return this.getPostsByUserId(user.id, getUserPostsFilterDto);
    }

    public createPost(user: User, postCreateDto: PostCreateDto): Promise<Post> {
        return this.postRepository.createPost(user, postCreateDto);
    }

    public updatePostByPostId(user: User, postId: number, postUpdateDto: PostUpdateDto): Promise<Post> {
        return this.postRepository.updatePostByPostId(user, postId, postUpdateDto);
    }

    public deletePostByPostId(user: User, postId: number): Promise<Post> {
        return this.postRepository.deletePostByPostId(user, postId);
    }

    public async hidePostByAdmin(postId: number, hidden: boolean): Promise<Post> {
        return this.postRepository.hidePostByAdmin(postId, hidden);
    }

    public async getPostsByOtherUserId(user: User, otherUserId: number, getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        console.log(user.id);
        console.log(otherUserId);
        if(user.id === otherUserId) {
            return await this.getPostsByUserId(user.id, getUserPostsFilterDto);
        }
        const followingExists = await this.followersService.checkFollowing(user.id, otherUserId);
        if(!followingExists) {
            const isUserPublic = await this.usersService.checkUserPublicById(otherUserId);
            if(!isUserPublic) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        return await this.getPostsByUserId(otherUserId, getUserPostsFilterDto);
    }

    private async getPostsByUserId(userId: number, getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        console.log(userId);
        const { page, pageSize } = getUserPostsFilterDto;
        const { offset, limit } = pagination<Ipagination>(page, pageSize);

        try {
            const posts = await this.postRepository.find({
                where: {
                    user: userId,
                    hidden: false
                },
                skip: offset,
                take: limit,
                loadRelationIds: true
            });
            return posts;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    
}
