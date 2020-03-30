import { User } from '../user.entity';
export declare const hashPassword: (password: string) => Promise<{
    salt: string;
    hashedPassword: string;
}>;
export declare const validatePassword: (password: string, self: User) => Promise<boolean>;
