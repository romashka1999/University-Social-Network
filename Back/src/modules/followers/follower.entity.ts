import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, Unique } from "typeorm";


@Entity()
@Unique(['userId', 'followerId'])
export class Follower extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false
    })
    userId: number;

    @Column({
        type: 'int',
        nullable: false
    })
    followerId: number;

    @CreateDateColumn()
    createDate: string;
}