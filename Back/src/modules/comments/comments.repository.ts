import { Repository, EntityRepository } from "typeorm";

import { Comment } from "./comment.entity";
import { CommentCreateDto } from "./dto/comment-create.dto";
import { InternalServerErrorException } from "@nestjs/common";


@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

    public async createComment(loggedUserId: number, postId: number, commentCreateDto: CommentCreateDto) {
        const { content } = commentCreateDto;

        const comment = new Comment();
        comment.userId = loggedUserId;
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