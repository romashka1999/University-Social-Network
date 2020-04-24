import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReplyCreateDto {
    
    @ApiProperty({
        type: String,
        description: 'content of reply',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}