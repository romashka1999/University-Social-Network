import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, RelationId, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";
import { PostReact } from "../post-reacts/post-react.entity";


@Entity()
export class Post extends BaseEntity {
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

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

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
    commentsCount: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    sharesCount: number;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @RelationId((post: Post) => post.user)
    userId: number;

    @OneToMany(type => PostReact, postReact => postReact.post)
    postReacts: PostReact[];

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];
}