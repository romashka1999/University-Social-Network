import { UserRepository } from './user.repository';
import { Status, User } from './user.entity';
import { GetUsersFilterDto } from './dto/getUsersFilter.dto';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getUserById(id: number): Promise<User>;
    getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]>;
    signUpUser(signUpUserDto: SignUpUserDto): Promise<boolean>;
    signInUser(signInUserDto: SignInUserDto): Promise<User>;
    updateUserStatus(id: number, status: Status): Promise<User>;
    deleteUserById(id: number): Promise<boolean>;
}
