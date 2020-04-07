import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";


export class UserSetPasswordDto {
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @IsNotEmpty()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    newPassword: string;
}