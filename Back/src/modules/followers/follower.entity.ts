import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from "typeorm";


@Entity()
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