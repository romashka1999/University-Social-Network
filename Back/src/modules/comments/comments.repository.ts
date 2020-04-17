import { Repository, EntityRepository } from "typeorm";

import { Comment } from "./comment.entity";
import { CommentCreateDto } from "./dto/comment-create.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { Post } from "../posts/post.entity";
import { User } from "../users/user.entity";


@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

    public async createComment(user: User, post: Post, commentCreateDto: CommentCreateDto) {
        const { content } = commentCreateDto;

        const comment = new Comment();
        comment.post = post;
        comment.user = user;
        comment.content = content;

        try {
            const createdComment = await comment.save();
            delete comment.user;
            return createdComment;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}