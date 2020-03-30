import { BaseEntity } from "typeorm";
export declare enum Status {
    VERIFIED = "VERIFIED",
    VERIFICATION_PENDING = "VERIFICATION_PENDING",
    UNVERIFIED = "UNVERIFIED"
}
export declare class User extends BaseEntity {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    age: number;
    password: string;
    salt: string;
    status: Status;
    validatePassword(password: string): Promise<boolean>;
}
