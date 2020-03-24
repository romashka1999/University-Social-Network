import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

import { validatePassword } from "./helpers/password";

export enum Status {
    VERIFIED = "VERIFIED",
    VERIFICATION_PENDING = "VERIFICATION_PENDING",
    UNVERIFIED = "UNVERIFIED"
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column({type: 'text'})
    firstname: string;

    @Column({type: 'text'})
    lastname: string;

    @Column({type: 'text', unique: true})
    email: string;

    @Column({type: 'text', unique: true})
    username: string;

    @Column({type: 'int'})
    age: number

    @Column('text')
    password: string;

    @Column('text')
    salt: string;

    @Column({type: 'enum', 
        enum: Status,
        default: Status.VERIFICATION_PENDING
    })
    status: Status;

    public async validatePassword(password: string): Promise<boolean> {
        return await validatePassword(password, this);
    }
}