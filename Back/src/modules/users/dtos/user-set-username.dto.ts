import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UserSetUsernameDto {

    @ApiProperty({
        type: String,
        description: 'username of user',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    username: string;
}