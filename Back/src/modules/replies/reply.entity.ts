import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, RelationId, OneToMany } from "typeorm";

import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";
import { ReplyReact } from "../reply-reacts/reply-react.entity";


@Entity()
export class Reply extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false
    })
    content: string;

    @Column({
        type: 'boolean',
        default: false,
        nullable: false
    })
    hidden: boolean;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    reactsCount: number;

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

    @ManyToOne(type => Comment, comment => comment.replies)
    comment: Comment;

    @RelationId((reply: Reply) => reply.comment)
    commentId: number;

    @ManyToOne(type => User, user => user.replies)
    user: User;

    @RelationId((reply: Reply) => reply.user)
    userId: number;

    @OneToMany(type => ReplyReact, replyReact => replyReact.reply)
    replyReacts: ReplyReact[];
}