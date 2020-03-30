import { IsNotEmpty, IsString } from "class-validator";

export class AdminSignInDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}