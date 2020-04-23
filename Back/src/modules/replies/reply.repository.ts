import { Repository, EntityRepository } from "typeorm";

import { Reply } from "./reply.entity";
import { ReplyCreateDto } from "./dto/reply-create.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";


@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {

    public async createReply(user: User, comment: Comment, replyCreateDto: ReplyCreateDto) {
        const { content } = replyCreateDto;

        const reply = new Reply();
        reply.comment = comment;
        reply.user = user;
        reply.content = content;

        try {
            const createdReply = await reply.save();
            // delete createdReply.user;
            return createdReply;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}