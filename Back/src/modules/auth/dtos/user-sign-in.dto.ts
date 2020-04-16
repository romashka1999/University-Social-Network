import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignInDto {
    @ApiProperty({
        type: String,
        description: 'accountIdentity of user',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    accountIdentity: string;

    @ApiProperty({
        type: String,
        description: 'password of user',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}