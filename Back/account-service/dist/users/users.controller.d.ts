import { UsersService } from './users.service';
import { User, Status } from './user.entity';
import { GetUsersFilterDto } from './dto/getUsersFilter.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUserById(id: number): Promise<User>;
    getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]>;
    createUser(): void;
    updateUserStatus(id: number, status: Status): Promise<User>;
    deleteUserById(id: number): Promise<boolean>;
}
