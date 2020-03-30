import { IsString, IsNotEmpty } from "class-validator";

export class AdminSIgnUpDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
} 