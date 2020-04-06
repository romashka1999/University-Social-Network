import { Repository, EntityRepository, UpdateResult } from "typeorm";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";


import { Post } from "./post.entity";
import { PostCreateDto } from "./dtos/post-create.dto";
import { User } from "../users/user.entity";
import { PostUpdateDto } from "./dtos/post-update.dto";
import { GetUserPostsFilterDto } from "./dtos/get-user-posts-filter.dto";
import { pagination, Ipagination } from "src/shared/pagination";
import { Follower } from "../followers/follower.entity";


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
            return createdPost;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async updatePostByPostId(user: User, postId: number, postUpdateDto: PostUpdateDto): Promise<Post> {
        try {
            const updatedPost: UpdateResult =  await this
                .createQueryBuilder('post')
                .update(Post)
                .set(postUpdateDto)
                .where("id = :id and userId = :userId and hidden = :hidden", { id: postId, userId: user.id, hidden: false })
                .execute();
            if(!updatedPost.affected) {
                throw new NotFoundException("POST_NOT_EXISTS");
            }
            return updatedPost.raw;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getPostsByUserIds(userIds: any[], getUserPostsFilterDto: GetUserPostsFilterDto): Promise<Array<Post>> {
        const { page, pageSize } = getUserPostsFilterDto;
        const { offset, limit } = pagination<Ipagination>(page, pageSize);

        try {
            return await this.createQueryBuilder('post')
                .where('post.userId IN(:...userIds)', {userIds: userIds})
                .orderBy('createdAt', 'DESC')
                .skip(offset)
                .take(limit)
                .getMany();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }



    }

    
}