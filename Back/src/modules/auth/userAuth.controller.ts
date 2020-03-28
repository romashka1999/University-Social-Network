import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { UserSignInDto } from "../users/dto/userSignIn.dto";
import { UserSignUpDto } from "../users/dto/userSignUp.dto";

@Controller('userAuth')
export class UserAuthController {

    constructor(private readonly userService: UserService) {}

    @Post('/signIn')
    signIn(@Body(ValidationPipe) userSignInDto: UserSignInDto) {
        this.userService.signInUser(userSignInDto);
    }

    @Post('/signUp')
    signUp(@Body(ValidationPipe) userSignUpDto: UserSignUpDto) {
        this.userService.signUpUser(userSignUpDto);
    }
}