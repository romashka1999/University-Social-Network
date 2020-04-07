import { IsString, IsNotEmpty } from "class-validator";


export class UserSetUsernameDto {
    @IsString()
    @IsNotEmpty()
    username: string;
}