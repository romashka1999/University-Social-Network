import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
export declare class AuthService {
    private axios;
    constructor();
    signUpUser(signUpUserDto: SignUpUserDto): Promise<any>;
    signInUser(signInUserDto: SignInUserDto): Promise<any>;
}
