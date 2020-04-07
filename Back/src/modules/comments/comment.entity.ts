import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Post } from "../posts/post.entity";
import { User } from "../users/user.entity";


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

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;

    @ManyToOne(type => User, user => user.comments)
    user: User;
}