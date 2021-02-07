import { IsNotEmpty, IsString, Matches, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AdminCreateDto {

    @ApiProperty({
        type: String,
        description: 'email of admin',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        description: 'password of admin',
        required: true,
        pattern: '/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)'
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    password: string;

    @ApiProperty({
        type: String,
        description: 'password of admin',
        required: true,
        pattern: '/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)'
    })
    @IsNumberString()
    @IsNotEmpty()
    adminRoleId: number;
}