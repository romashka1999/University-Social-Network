import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class SignInDto {
    @IsString()
    @MinLength(3, { message: 'min length is 3' })
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @IsNotEmpty()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    {message: 'password is too weak'})
    password: string;
}