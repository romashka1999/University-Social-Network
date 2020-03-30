import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import { User } from "./user.entity";
import { UserSignUpDto } from "../auth/dtos/userSignUp.dto";
import { UserSignInDto } from "../auth/dtos/userSignIn.dto";
import { hashPassword } from "src/modules/auth/helpers/password";
import { GetUsersFilterDto } from "./dtos/getUsersFilter.dto";


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
        
        return true;
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
}