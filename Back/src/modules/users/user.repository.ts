import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import { User } from "./user.entity";
import { UserSignInDto } from './dto/userSignIn.dto';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { hashPassword } from "../../shared/password";
import { GetUsersFilterDto } from "./dto/getUsersFilter.dto";
import { Ipagination, pagination } from "src/shared/pagination";



@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(userSignUpDto: UserSignUpDto): Promise<boolean> {
        const { password } = userSignUpDto;

        const { salt, hashedPassword } = await hashPassword(password);// hash pass
        const user =  new User();
        user.firstname = userSignUpDto.firstname;
        user.lastname = userSignUpDto.lastname;
        user.email = userSignUpDto.email;
        user.username = userSignUpDto.ursername;
        user.age = userSignUpDto.age || null;
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

    async signIn(userSignInDto: UserSignInDto): Promise<User> | null {
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
        let user = await this.findOne({
            where: {
                username: accountIdentity 
            }
        });

        if(user) {
            return user;
        } else {
            user = await this.findOne({
                where: {
                    email: accountIdentity 
                }
            });
            if(user) {
                return user;
            } else {
                null;
            }
        }
         
    }

    public async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>> {
        const { status, search ,order, page, pageSize } = getUsersFilterDto;
        const query = this.createQueryBuilder('user');

        if(order === 'ASC') {
            query.addOrderBy('ASC'); //ordering ascending
        } else if(order === 'DESC') {
            query.addOrderBy('DESC') //ordering descending
        }

        if(page && pageSize) { //pagination logic
            const { offset, limit } = <Ipagination>pagination(page, pageSize);
            query.offset(offset);
            query.limit(limit);
        }

        // i use query.andWhere method, there is also query.where method ,but query.where method overrides
        // previous query and i want to do all query together :)
        if(status) { 
            query.andWhere('user.status = :status', {status: status}) //search by status
        }

        if(search) {
            query.andWhere('(user.firstname LIKE :search OR user.lastname LIKE :search)', {search: `%${search}%`})
        } //search by search word which likes any title or description

        try {
            const users = await query.getMany();
            return users;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}