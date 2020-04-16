import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsEnum, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { UserGender } from "src/modules/users/user.entity";

export class UserSignUpDto {

    @ApiProperty({
        type: String,
        description: 'firstName of user',
        required: true
    })
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    firstName: string;


    @ApiProperty({
        type: String,
        description: 'lastName of user',
        required: true
    })
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        type: IsDateString,
        description: 'birthDate of user',
        required: true
    })
    @IsDateString()
    @IsNotEmpty()
    birthDate: string;

    @ApiProperty({
        name: 'gender',
        enum: UserGender,
        description: 'gender of user',
        default: UserGender.OTHER,
        required: false
    })
    @IsEnum(UserGender)
    gender: UserGender;

    @ApiProperty({
        type: String,
        description: 'username of user',
        required: true
    })
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
        description: 'email of user',
        required: true
    })
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        description: 'phoneNumber of user',
        required: true
    })
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({
        type: String,
        description: 'password of user',
        required: true,
        pattern: '/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @IsNotEmpty()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    password: string;
}