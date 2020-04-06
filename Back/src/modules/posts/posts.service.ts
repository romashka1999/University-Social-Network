import { Injectable, InternalServerErrorException, HttpStatus, HttpException, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';


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
        return this.postRepository.getPostsByUserIds(followees, getUserPostsFilterDto);
    }

    public async getPostsByLoggedUserId(user: User, getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        return this.getPostsByUserId(user, getUserPostsFilterDto);
    }

    public createPost(user: User, postCreateDto: PostCreateDto): Promise<Post> {
        return this.postRepository.createPost(user, postCreateDto);
    }

    public updatePostByPostId(user: User, postId: number, postUpdateDto: PostUpdateDto): Promise<Post> {
        return this.postRepository.updatePostByPostId(user, postId, postUpdateDto);
    }

    public async deletePostByPostId(user: User, postId: number): Promise<Post> {
        try {
            const deletedePost: DeleteResult = await this.postRepository.delete({id: postId, user: user, hidden: false});

            if(!deletedePost.affected) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "POST_NOT_EXISTS"};
            }

            return deletedePost.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async hidePostByAdmin(postId: number, hidden: boolean) {
        try {
            const updatedPost: UpdateResult =  await this.postRepository
                .createQueryBuilder('post')
                .update(Post)
                .set({hidden})
                .where("id = :id", { id: postId})
                .execute();
            if(!updatedPost.affected) {
                throw new NotFoundException("POST_NOT_EXISTS");
            }
            return updatedPost.raw;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getPostsByOtherUserId(user: User, otherUserId: number, getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        const otherPublicUser = await this.usersService.checkUserPublicById(otherUserId);
        if(!otherPublicUser) {
            throw new BadRequestException("USER_IS_NOT_PUBLIC");
        }
        return await this.getPostsByUserId(otherPublicUser, getUserPostsFilterDto);
    }

    private async getPostsByUserId(user: User, getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        const { page, pageSize } = getUserPostsFilterDto;
        const { offset, limit } = pagination<Ipagination>(page, pageSize);

        try {
            const posts = await this.postRepository.find({
                where: {
                    user: user,
                    hidden: false
                },
                skip: offset,
                take: limit
            });
            return posts;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    
}
