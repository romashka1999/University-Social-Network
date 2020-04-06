import { Injectable, InternalServerErrorException, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';


import { PostRepository } from './post.repository';
import { PostCreateDto } from './dtos/post-create.dto';
import { User } from '../users/user.entity';
import { Post } from './post.entity';
import { PostUpdateDto } from './dtos/post-update.dto';
import { GetUserPostsFilterDto } from './dtos/get-user-posts-filter.dto';
import { pagination } from 'src/shared/pagination';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(PostRepository) private readonly postRepository: PostRepository) {}

    public async getPostsByUserId(user: User, getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        const { page, pageSize } = getUserPostsFilterDto;
        const { offset, limit } = pagination(page, pageSize);

        try {
            const posts = this.postRepository.find({
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

    public createPost(user: User, postCreateDto: PostCreateDto): Promise<Post> {
        return this.postRepository.createPost(user, postCreateDto);
    }

    public updatePostByPostId(user: User, postId: number, postUpdateDto: PostUpdateDto): Promise<Post> {
        return this.postRepository.updatePostByPostId(user, postId, postUpdateDto);
    }

    public async deletePostByUserIdAndPostId(postId: number, user: User): Promise<Post> {
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

    public getPostsForAdmin() {
        
    }

    
}
