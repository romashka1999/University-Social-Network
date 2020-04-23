import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, RelationId, OneToMany } from "typeorm";
import { Post } from "../posts/post.entity";
import { User } from "../users/user.entity";
import { CommentReact } from "../comment-reacts/comment-react.entity";
import { Reply } from "../replies/reply.entity";


@Entity()
export class Comment extends BaseEntity {
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

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    repliesCount: number;

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;

    @RelationId((comment: Comment) => comment.post)
    postId: number;

    @ManyToOne(type => User, user => user.comments)
    user: User;

    @RelationId((comment: Comment) => comment.user)
    userId: number;

    @OneToMany(type => CommentReact, commentReact => commentReact.comment)
    commentReacts: CommentReact[];

    @OneToMany(type => Reply, reply => reply.comment)
    replies: Reply[];
}