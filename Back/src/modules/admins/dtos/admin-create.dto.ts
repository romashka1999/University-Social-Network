import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AdminCreateDto {
    @MinLength(3)
    @MaxLength(20)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @IsNotEmpty()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    password: string;
}