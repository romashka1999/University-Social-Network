import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import { User } from "./user.entity";
import { UserSignInDto } from "../../shared/auth/dtos/userSignIn.dto";
import { hashPassword } from "../../shared/auth/helpers/password";
import { GetUsersFilterDto } from "./dtos/getUsersFilter.dto";
import { UserSignUpDto } from "../../shared/auth/dtos/UserSignUp.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(userSignUpDto: UserSignUpDto): Promise<boolean> {
        const { username, password } = userSignUpDto;

        const { salt, hashedPassword } = await hashPassword(password);// hash pass
        const user =  new User();
        user.username = username;
        user.password = hashedPassword;
        user.salt = salt;

        try {
            await user.save();
        } catch (error) {
            if(error.code === '23505') {//duplicate username 
                throw new ConflictException('usarname already exists');
            } else {
                throw new InternalServerErrorException(error);
            }
        }
        
        return true;
    }

    async signIn(userSignInDto: UserSignInDto): Promise<User> {
        const { username, password } = userSignInDto;

        try {
            const user = await this.findOne({username: username});

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

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
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