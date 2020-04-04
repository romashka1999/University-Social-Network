import { Repository, EntityRepository, UpdateResult } from "typeorm";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";


import { Post } from "./post.entity";
import { PostCreateDto } from "./dtos/post-create.dto";
import { User } from "../users/user.entity";
import { PostUpdateDto } from "./dtos/post-update.dto";


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

    public async updatePostByUserIdAndPostId(postId: number, user: User, postUpdateDto: PostUpdateDto): Promise<Post> {
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

    
}