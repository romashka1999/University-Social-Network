import { IsString, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class SendMessageDto {

    @ApiProperty({
        type: String,
        description: 'content of message',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    content: number;
}