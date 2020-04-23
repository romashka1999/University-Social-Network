import { BaseEntity, PrimaryGeneratedColumn, Entity, ManyToOne, RelationId, Unique } from "typeorm";

import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";


@Entity()
@Unique(['user', 'comment'])
export class CommentReact extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.commentReacts)
    user: User;

    @RelationId((commentReact: CommentReact) => commentReact.user)
    userId: number;

    @ManyToOne(type => Comment, comment => comment.commentReacts)
    comment: Comment;

    @RelationId((commentReact: CommentReact) => commentReact.comment)
    commentId: number;
}