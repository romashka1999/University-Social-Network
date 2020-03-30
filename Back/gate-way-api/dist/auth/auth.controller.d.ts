import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUpUser(signUpUserDto: SignUpUserDto): Promise<any>;
    signInUser(signInUserDto: SignInUserDto): Promise<any>;
}
