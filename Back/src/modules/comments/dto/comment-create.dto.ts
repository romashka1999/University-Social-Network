import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommentCreateDto {
    
    @ApiProperty({
        type: String,
        description: 'content of comment',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}