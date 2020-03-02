import { IsString, IsEmail, IsInt, IsOptional, MinLength, MaxLength,
Matches, IsNotEmpty, IsPositive, Min} from 'class-validator';

export class SignUpUserDto {
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @IsNotEmpty()
    ursername: string;

    @IsString()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    @IsNotEmpty()
    password: string;

    @IsInt()
    @IsPositive()
    @Min(8)
    @IsOptional()
    age: number;
}