import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UserSetEmailDto {

    @ApiProperty({
        type: String,
        description: 'email of user',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    email: string;
}