import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsDate, IsEnum } from "class-validator";
import { UserGender } from "src/modules/users/user.entity";

export class UserSignUpDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    lastName: string;

    @IsDate()
    @IsNotEmpty()
    birthDate: Date;

    @IsEnum(UserGender)
    gender: UserGender;

    @IsString()
    profileImgUrl: string;


    @IsString()
    coverImageUrl: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @IsNotEmpty()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    password: string;
}