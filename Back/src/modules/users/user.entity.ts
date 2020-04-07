import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { validatePassword } from '../auth/helpers/password';
import { Post } from "../posts/post.entity";
import { Comment } from '../comments/comment.entity';


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
@Unique(['username', 'email', 'phoneNumber'])
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
        nullable: true
    })
    email: string;

    @Column({
        type: 'text',
        nullable: false
    })
    username: string;

    @Column({
        length: 9,
        nullable: false
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

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

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