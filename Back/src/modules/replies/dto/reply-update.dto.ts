import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReplyUpdateDto {
    
    @ApiProperty({
        type: String,
        description: 'content of reply',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}