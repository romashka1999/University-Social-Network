import { IsString, IsNotEmpty } from "class-validator";


export class UserSetEmailDto {
    @IsString()
    @IsNotEmpty()
    email: string;
}