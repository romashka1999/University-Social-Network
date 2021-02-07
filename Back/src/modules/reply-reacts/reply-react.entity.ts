import { BaseEntity, PrimaryGeneratedColumn, Entity, ManyToOne, RelationId, Unique } from "typeorm";

import { User } from "../users/user.entity";
import { Reply } from "../replies/reply.entity";


@Entity()
@Unique(['user', 'reply'])
export class ReplyReact extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.replyReacts)
    user: User;

    @RelationId((replyReact: ReplyReact) => replyReact.user)
    userId: number;

    @ManyToOne(type => Reply, reply => reply.replyReacts)
    reply: Reply;

    @RelationId((replyReact: ReplyReact) => replyReact.reply)
    replyId: number;
}