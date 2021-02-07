import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UserSetPhoneNumberDto {

    @ApiProperty({
        type: String,
        description: 'phoneNumber of user',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}