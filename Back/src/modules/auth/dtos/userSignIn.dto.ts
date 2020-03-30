import { IsNotEmpty, IsString } from "class-validator";

export class UserSignInDto {
    @IsString()
    @IsNotEmpty()
    accountIdentity: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}