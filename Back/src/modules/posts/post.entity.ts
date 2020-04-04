import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";


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


    @Column({
        type: 'boolean',
        default: true,
        nullable: false
    })
    publicPost: boolean;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];
}