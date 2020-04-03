import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AdminCreateDto {
    @MinLength(3)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsNotEmpty()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    password: string;
}