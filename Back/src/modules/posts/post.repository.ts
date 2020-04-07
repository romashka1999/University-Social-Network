import { Repository, EntityRepository, UpdateResult, DeleteResult } from "typeorm";
import { InternalServerErrorException, NotFoundException, HttpStatus, HttpException } from "@nestjs/common";


import { Post } from "./post.entity";
import { PostCreateDto } from "./dtos/post-create.dto";
import { User } from "../users/user.entity";
import { PostUpdateDto } from "./dtos/post-update.dto";
import { GetUserPostsFilterDto } from "./dtos/get-user-posts-filter.dto";
import { pagination, Ipagination } from "src/shared/pagination";


@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

    public async createPost(user: User, postCreateDto: PostCreateDto): Promise<Post> {
        const { content, publicPost } = postCreateDto;

        const post = new Post();
        post.user = user;
        post.content = content;
        if(publicPost) {
            post.publicPost = publicPost;
        }

        try {
            const createdPost = await post.save();
            delete post.user;
            return createdPost;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async updatePostByPostId(user: User, postId: number, postUpdateDto: PostUpdateDto): Promise<Post> {
        try {
            const updatedPost: UpdateResult =  await this.update({id: postId, user: user, hidden: false}, postUpdateDto);
            if(!updatedPost.affected) {
                throw {statusCode: HttpStatus.BAD_REQUEST, message: "POST_NOT_EXISTS"};
            }
            return updatedPost.raw;
        } catch (error) {
            if(error.statusCode) {
                throw new HttpException(error.message, error.statusCode);
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async deletePostByPostId(user: User, postId: number): Promise<Post> {
        try {
            const deletedePost: DeleteResult = await this.delete({id: postId, userId: user.id, hidden: false});

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

    public async getPostsByUserIds(userIds: number[], getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        const { page, pageSize } = getUserPostsFilterDto;
        const { offset, limit } = pagination<Ipagination>(page, pageSize);

        try {
            return await this.createQueryBuilder('post')
                .where('post.user IN(:...userIds)', {userIds: userIds})
                .orderBy('post.createDate', 'DESC')
                .skip(offset)
                .take(limit)
                .getMany();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async hidePostByAdmin(postId: number, hidden: boolean): Promise<Post> {
        try {
            const updatedPost: UpdateResult =  await this
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

    
}