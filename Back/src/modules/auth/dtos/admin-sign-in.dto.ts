import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AdminSignInDto {
    
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
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}