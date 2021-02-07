import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, RelationId } from "typeorm";
import { User } from "../users/user.entity";


export enum NotificationType {
    POST_LIKE = "POST_LIKE",
    POST_COMMENT = "POST_COMMENT",
    POST_COMMENT_REACT = "POST_COMMENT_REACT",
    POST_COMMENT_REPLY = "POST_COMMENT_REPLY",
    POST_COMMENT_REPLY_REACT = "POST_COMMENT_REPLY_REACT",
    MESSAGE = "MESSAGE",
    FOLLOW = "FOLLOW"
}

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: NotificationType,
        nullable: false
    })
    type: NotificationType;

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
    viewed: boolean;

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    updateDate: string;

    @ManyToOne(type => User, user => user.notifications)
    user: User;

    @RelationId((notification: Notification) => notification.user)
    userId: number;
}


