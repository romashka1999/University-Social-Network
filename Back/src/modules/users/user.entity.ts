import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { validatePassword } from '../auth/helpers/password';
import { Post } from "../posts/post.entity";
import { Comment } from '../comments/comment.entity';
import { PostReact } from "../post-reacts/post-react.entity";
import { CommentReact } from "../comment-reacts/comment-react.entity";
import { Reply } from "../replies/reply.entity";
import { ReplyReact } from "../reply-reacts/reply-react.entity";
import { Notification } from "../notifications/notification.entity";


export enum UserStatus {
    VERIFIED = "VERIFIED",
    VERIFICATION_PENDING = "VERIFICATION_PENDING",
    UNVERIFIED = "UNVERIFIED"
}

export enum UserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false
    })
    firstName: string;

    @Column({
        type: 'text',
        nullable: false
    })
    lastName: string;

    @Column({
        type: 'text',
        nullable: false
    })
    birthDate: string;

    @Column({
        type: 'enum',
        enum: UserGender,
        default: UserGender.OTHER,
        nullable: false
    })
    gender: UserGender;

    @Column({
        type: 'text',
        nullable: true
    })
    profileImgUrl: string;

    @Column({
        type: 'text',
        nullable: true
    })
    coverImageUrl: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        length: 9,
        nullable: false,
        unique: true
    })
    phoneNumber: string;

    @Column({
        type: 'boolean',
        default: true, 
        nullable: false
    })
    publicUser: boolean;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.VERIFIED,
        nullable: false
    })
    status: UserStatus;

    @Column({
        type: 'text',
        nullable: false
    })
    password: string;

    @Column({
        type: 'text',
        nullable: false
    })
    salt: string;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    followersCount: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    followingsCount: number;

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @OneToMany(type => Notification, notification => notification.user)
    notifications: Notification[];

    @OneToMany(type => PostReact, postReact => postReact.user)
    postReacts: PostReact[];

    @OneToMany(type => CommentReact, commentReact => commentReact.user)
    commentReacts: CommentReact[];

    @OneToMany(type => ReplyReact, replyReact => replyReact.user)
    replyReacts: ReplyReact[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(type => Reply, reply => reply.user)
    replies: Reply[];

    public getAge(): string {
        const today = new Date();
        const birthDate = new Date(this.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age.toString();
    }

    public async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}