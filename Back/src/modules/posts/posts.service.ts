import { Injectable, InternalServerErrorException, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
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
import { AppGateway } from 'src/app.gateway';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
        private readonly usersService: UsersService,
        private readonly followersService: FollowersService,
        private readonly appGateway: AppGateway) {}

    public async getFolloweesPostsForLoggedUser(user: User, getUserPostsFilterDto: GetUserPostsFilterDto) {
        const followees = await this.followersService.getFolloweesByUserId(user.id, {page: null, pageSize: null});
        const followeesArray = followees.map(follow => follow.userId);
        return this.postRepository.getPostsByUserIds(followeesArray, getUserPostsFilterDto);
    }

    public async createPost(user: User, postCreateDto: PostCreateDto): Promise<Post> {
        const createdPost = await this.postRepository.createPost(user, postCreateDto);
        this.appGateway.wss.to(`${user.id}`).emit('postCreated', createdPost);
        return createdPost;
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

    public async getPostsByAnyUserId(loggedUserId, userId: number, getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        if(loggedUserId === userId) {
            return await this.getPostsByUserId(loggedUserId, getUserPostsFilterDto);
        }
        const followingExists = await this.followersService.checkFollowing(loggedUserId, userId);
        if(!followingExists) {
            const isUserPublic = await this.usersService.checkUserPublicById(userId);
            if(!isUserPublic) {
                throw new BadRequestException("USER_IS_NOT_PUBLIC");
            }
        }
        return await this.getPostsByUserId(userId, getUserPostsFilterDto);
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
            });
            return posts;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getPostById(postId: number): Promise<Post> {
        try {
            const post = await this.postRepository.findOne({id: postId});
            if(!post) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "POST_NOT_EXISTS"};
            }
            return post;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async updatePostReactCounter(postId: number, action: string): Promise<void> {
        try {
            if(action === "REACT") {
                await this.postRepository.increment({id: postId}, 'reactsCount', 1);
            } else if(action === "UNREACT") {
                await this.postRepository.decrement({id: postId}, 'reactsCount', 1);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    } 

    
}
