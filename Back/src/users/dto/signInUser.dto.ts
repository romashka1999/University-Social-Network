import { IsString, IsNotEmpty } from "class-validator";

export class SignInUserDto {
    @IsString()
    @IsNotEmpty()
    accountIdentity: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}