import { Repository, EntityRepository, UpdateResult } from "typeorm";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { User } from "./user.entity";
import { UserSignUpDto } from "../auth/dtos/user-sign-up.dto";
import { UserSignInDto } from "../auth/dtos/user-sign-in.dto";
import { hashPassword } from "src/modules/auth/helpers/password";
import { GetUsersFilterDto } from "./dtos/get-users-filter.dto";
import { SetUserInfoInterface } from "./interfaces/set-user-info.interface";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async signUp(signUpDto: UserSignUpDto): Promise<boolean> {
        const { username, password } = signUpDto;

        const { salt, hashedPassword } = await hashPassword(password);// hash pass
        const user =  new User();
        user.username = username;
        user.password = hashedPassword;
        user.salt = salt;

        try {
            await user.save();
            return true;
        } catch (error) {
            if(error.code === '23505') {//duplicate username 
                try {
                    const username = await this.findOne({username: signUpDto.username});
                    if(username) {
                        throw new ConflictException("USERNAME_ALREADY_EXISTS");
                    } 

                    const email = await this.findOne({email: signUpDto.email});
                    if(email) {
                        throw new ConflictException("EMAIL_ALREADY_EXISTS");
                    } 
                    throw new ConflictException("PHONENUMBER_ALREADY_EXISTS");

                } catch (error) {
                    throw new InternalServerErrorException(error);
                }
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    public async signIn(userSignInDto: UserSignInDto): Promise<User> | null {
        const { accountIdentity, password } = userSignInDto;

        try {
            const user = await this.getUserByAccountIdentity(accountIdentity);

            if(user && await user.validatePassword(password)) {
                if(!user || user.password !== password) {
                    return user;
                } else {
                    return null;
                }
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getUserByAccountIdentity(accountIdentity: string): Promise<User> | null {
        try {
            let user = await this.findOne({username: accountIdentity});
            if(user) {
                return user;
            } else {
                user = await this.findOne({email: accountIdentity});
                if(user) {
                    return user;
                } else {
                    user = await this.findOne({phoneNumber: accountIdentity});
                    user ? user : null;
                }
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        const { age } = getUsersFilterDto;

        const query = this.createQueryBuilder('user');

        if(age) {
            query.andWhere('user.age >= :age', {age: age});
        }

        try {
            const users = await query.getMany();
            return users;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async setUserInfo(id: number, userInfo: SetUserInfoInterface): Promise<boolean> {
        try {
            const updatedUser: UpdateResult =  await this
                .createQueryBuilder('translation')
                .update(User)
                .set(userInfo)
                .where("id = :id", { id: id })
                .execute();
            if(!updatedUser.affected) {
                throw new NotFoundException("USER_NOT_EXISTS");
            }
            return true;
        } catch (error) {
            if(error.code === '23505') {//duplicate email 
                if(userInfo.email) {
                    throw new ConflictException("EMAIL_ALREADY_EXISTS");
                } else if(userInfo.username) {
                    throw new ConflictException("USERNAME_ALREADY_EXISTS");
                } else {
                    throw new ConflictException("PHONENUMBER_ALREADY_EXISTS");
                }
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }
}