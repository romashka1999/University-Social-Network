import { IsString, IsNotEmpty } from "class-validator";


export class UserSetPasswordDto {
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}