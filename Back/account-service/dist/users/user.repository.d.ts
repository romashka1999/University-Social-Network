import { Repository } from "typeorm";
import { User } from "./user.entity";
import { SignUpUserDto } from "./dto/signUpUser.dto";
import { SignInUserDto } from "./dto/signInUser.dto";
import { GetUsersFilterDto } from "./dto/getUsersFilter.dto";
export declare class UserRepository extends Repository<User> {
    signUp(signUpDto: SignUpUserDto): Promise<boolean>;
    signIn(signInDto: SignInUserDto): Promise<User>;
    getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<Array<User>>;
}
