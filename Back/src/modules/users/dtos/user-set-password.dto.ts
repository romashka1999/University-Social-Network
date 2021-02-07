import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UserSetPasswordDto {

    @ApiProperty({
        type: String,
        description: 'oldPassword of user',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    oldPassword: string;


    @ApiProperty({
        type: String,
        description: 'newPassword of user',
        required: true,
        pattern: '/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @IsNotEmpty()
    @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    newPassword: string;
}